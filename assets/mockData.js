"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lists = void 0;
var card_1 = require("../data/models/card");
var list_1 = require("../data/models/list");
var toDo = new list_1.List('To do');
toDo.cards = [
    new card_1.Card('Implement renaming lists', 'Should be possible to change the name of the list'),
    new card_1.Card('Implement adding cards', 'Should be possible to create cards'),
    new card_1.Card('Implement removing of cards', 'Should be possible to remove card when button clicked'),
    new card_1.Card('Implement changing name of card', 'Should be possible to change the name of card'),
    new card_1.Card('Implement changing description of card', 'Should be possible to change description of card'),
    new card_1.Card('Implement copy card', 'Using pattern Prototype implement a possibility to copy card. Id should be new for new card. The name of card should have "copy" suffix'),
    new card_1.Card('Implement logging on server side', 'Using pattern Observer implement logging with 3 levels: info, warn, error. There should be 2 loggers: first will write only errors into console, second will write all logs into file'),
    new card_1.Card('Implement logging of reorder action', 'Using pattern Proxy implement logging for the ReorderService (logging proxy). Should be logged each what card/list and when was moved'),
];
var inProgress = new list_1.List('In progress');
inProgress.cards = [
    new card_1.Card('Implement adding lists', 'Should be possible to create list'),
];
exports.lists = [toDo, inProgress];
//# sourceMappingURL=mockData.js.map