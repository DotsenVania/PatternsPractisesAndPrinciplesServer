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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderService = void 0;
var reorderInterface_1 = require("./reorderInterface");
var ReorderService = /** @class */ (function (_super) {
    __extends(ReorderService, _super);
    function ReorderService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReorderService.prototype.reorder = function (items, startIndex, endIndex) {
        var result = __spreadArray([], items, true);
        var removed = result.splice(startIndex, 1)[0];
        result.splice(endIndex, 0, removed);
        return result;
    };
    ReorderService.prototype.reorderCards = function (_a) {
        var _this = this;
        var _b, _c;
        var lists = _a.lists, sourceIndex = _a.sourceIndex, destinationIndex = _a.destinationIndex, sourceListId = _a.sourceListId, destinationListId = _a.destinationListId;
        var target = (_c = (_b = lists.find(function (list) { return list.id === sourceListId; })) === null || _b === void 0 ? void 0 : _b.cards) === null || _c === void 0 ? void 0 : _c[sourceIndex];
        if (!target) {
            return lists;
        }
        var newLists = lists.map(function (list) {
            if (list.id === sourceListId) {
                list = __assign(__assign({}, list), { cards: _this.removeCardFromList(list.cards, sourceIndex) });
            }
            if (list.id === destinationListId) {
                list = __assign(__assign({}, list), { cards: _this.addCardToList(list.cards, destinationIndex, target) });
            }
            return list;
        });
        return newLists;
    };
    ReorderService.prototype.removeCardFromList = function (cards, index) {
        return cards.slice(0, index).concat(cards.slice(index + 1));
    };
    ReorderService.prototype.addCardToList = function (cards, index, card) {
        return cards.slice(0, index).concat(card).concat(cards.slice(index));
    };
    return ReorderService;
}(reorderInterface_1.ReorderInterface));
exports.ReorderService = ReorderService;
//# sourceMappingURL=reorder.service.js.map