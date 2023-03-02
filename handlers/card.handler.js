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
exports.CardHandler = void 0;
var enums_1 = require("../common/enums");
var card_1 = require("../data/models/card");
var socket_handler_1 = require("./socket.handler");
var CardHandler = /** @class */ (function (_super) {
    __extends(CardHandler, _super);
    function CardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardHandler.prototype.handleConnection = function (socket) {
        socket.on(enums_1.CardEvent.CREATE, this.createCard.bind(this));
        socket.on(enums_1.CardEvent.REORDER, this.reorderCards.bind(this));
        socket.on(enums_1.CardEvent.DELETED, this.deleteCard.bind(this));
        socket.on(enums_1.CardEvent.RENAME, this.renameCard.bind(this));
        socket.on(enums_1.CardEvent.CHANGE_DESCRIPTION, this.changeDescription.bind(this));
        socket.on(enums_1.CardEvent.CLONE, this.cloneCard.bind(this));
    };
    CardHandler.prototype.createCard = function (listId, cardName, description) {
        if (description === void 0) { description = ""; }
        var newCard = new card_1.Card(cardName, description);
        var lists = this.db.getData();
        var list = lists.find(function (list) { return list.id === listId; });
        if (!list) {
            this.logData.setError("List by id: ".concat(list.id, " not found"));
            return;
        }
        var updatedList = __assign(__assign({}, list), { cards: list.cards.concat(newCard) });
        this.db.setData(lists.map(function (list) { return (list.id === listId ? updatedList : list); }));
        this.logData.setMessage("Card was created successfully:" + JSON.stringify(newCard));
        this.updateLists();
    };
    // PATTERN: Prototype
    CardHandler.prototype.cloneCard = function (listId, cardId) {
        var lists = this.db.getData();
        var list = lists.find(function (list) { return list.id === listId; });
        if (!list) {
            this.logData.setError("List by id: ".concat(listId, " not found"));
            return;
        }
        var oldCard = list.cards.find(function (card) { return card.id === cardId; });
        var newCard = oldCard.clone(); // Clone card
        var updatedList = __assign(__assign({}, list), { cards: list.cards.concat(newCard) });
        this.db.setData(lists.map(function (list) { return (list.id === listId ? updatedList : list); }));
        this.logData.setMessage("Card was cloned successfully:" + JSON.stringify(newCard));
        this.updateLists();
    };
    CardHandler.prototype.deleteCard = function (listId, cardId) {
        var lists = this.db.getData();
        var list = lists.find(function (list) { return list.id === listId; });
        if (!list) {
            this.logData.setError("List by id: ".concat(listId, " not found"));
            return;
        }
        var updatedList = __assign(__assign({}, list), { cards: list.cards.filter(function (cart) { return cart.id !== cardId; }) });
        this.db.setData(lists.map(function (list) { return (list.id === listId ? updatedList : list); }));
        this.logData.setMessage("Card by id: ".concat(cardId, " deleted successfully"));
        this.updateLists();
    };
    CardHandler.prototype.renameCard = function (listId, cardId, value) {
        var lists = this.db.getData();
        var list = lists.find(function (list) { return list.id === listId; });
        if (!list) {
            this.logData.setError("List by id: ".concat(listId, " not found"));
            return;
        }
        var updatedList = __assign(__assign({}, list), { cards: list.cards.map(function (card) {
                if (card.id === cardId) {
                    card.changeName(value);
                    return card;
                }
                return card;
            }) });
        this.db.setData(lists.map(function (list) { return (list.id === listId ? updatedList : list); }));
        this.updateLists();
    };
    CardHandler.prototype.changeDescription = function (listId, cardId, value) {
        var lists = this.db.getData();
        var list = lists.find(function (list) { return list.id === listId; });
        if (!list) {
            this.logData.setError("List by id: ".concat(listId, " not found"));
            return;
        }
        var updatedList = __assign(__assign({}, list), { cards: list.cards.map(function (card) {
                if (card.id === cardId) {
                    return card.changeDescription(value);
                }
                return card;
            }) });
        this.db.setData(lists.map(function (list) { return (list.id === listId ? updatedList : list); }));
        this.updateLists();
    };
    CardHandler.prototype.reorderCards = function (_a) {
        var sourceIndex = _a.sourceIndex, destinationIndex = _a.destinationIndex, sourceListId = _a.sourceListId, destinationListId = _a.destinationListId;
        var lists = this.db.getData();
        var reordered = this.reorderService.reorderCards({
            lists: lists,
            sourceIndex: sourceIndex,
            destinationIndex: destinationIndex,
            sourceListId: sourceListId,
            destinationListId: destinationListId,
        });
        this.db.setData(reordered);
        this.updateLists();
    };
    return CardHandler;
}(socket_handler_1.SocketHandler));
exports.CardHandler = CardHandler;
//# sourceMappingURL=card.handler.js.map