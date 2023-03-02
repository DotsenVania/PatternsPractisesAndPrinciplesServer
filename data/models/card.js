"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var crypto_1 = require("crypto");
var Card = /** @class */ (function () {
    function Card(name, description) {
        this.name = name;
        this.description = description;
        this.createAt = new Date();
        this.id = (0, crypto_1.randomUUID)();
    }
    Card.prototype.clone = function () {
        return new Card(this.name, this.description);
    };
    Card.prototype.changeName = function (value) {
        this.name = value;
        return this;
    };
    Card.prototype.changeDescription = function (value) {
        this.description = value;
        return this;
    };
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map