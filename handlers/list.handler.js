"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListHandler = void 0;
var enums_1 = require("../common/enums");
var list_1 = require("../data/models/list");
var socket_handler_1 = require("./socket.handler");
var ListHandler = /** @class */ (function (_super) {
    __extends(ListHandler, _super);
    function ListHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListHandler.prototype.handleConnection = function (socket) {
        socket.on(enums_1.ListEvent.CREATE, this.createList.bind(this));
        socket.on(enums_1.ListEvent.GET, this.getLists.bind(this));
        socket.on(enums_1.ListEvent.REORDER, this.reorderLists.bind(this));
        socket.on(enums_1.ListEvent.DELETE, this.deleteList.bind(this));
        socket.on(enums_1.ListEvent.UPDATE, this.updateList.bind(this));
    };
    ListHandler.prototype.getLists = function (callback) {
        callback(this.db.getData());
    };
    ListHandler.prototype.reorderLists = function (sourceIndex, destinationIndex) {
        var lists = this.db.getData();
        var reorderedLists = this.reorderService.reorder(lists, sourceIndex, destinationIndex);
        this.db.setData(reorderedLists);
        this.updateLists();
    };
    ListHandler.prototype.createList = function (name) {
        var lists = this.db.getData();
        var newList = new list_1.List(name);
        this.db.setData(lists.concat(newList));
        this.logData.setMessage("List was created successfully:" + JSON.stringify(newList));
        this.updateLists();
    };
    ListHandler.prototype.deleteList = function (listId) {
        var lists = this.db.getData();
        var newListData = lists.filter(function (list) { return list.id !== listId; });
        this.db.setData(newListData);
        this.logData.setMessage("List by id: ".concat(listId, " deleted successfully"));
        this.updateLists();
    };
    ListHandler.prototype.updateList = function (listId, name) {
        var lists = this.db.getData();
        var newListData = lists.map(function (list) {
            if (list.id === listId) {
                return __assign(__assign({}, list), { name: name });
            }
            return list;
        });
        this.db.setData(newListData);
        this.updateLists();
    };
    return ListHandler;
}(socket_handler_1.SocketHandler));
exports.ListHandler = ListHandler;
//# sourceMappingURL=list.handler.js.map