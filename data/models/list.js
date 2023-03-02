"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var crypto_1 = require("crypto");
var List = /** @class */ (function () {
    // Card[] = []
    function List(name) {
        this.cards = [];
        this.name = name;
        this.id = (0, crypto_1.randomUUID)();
    }
    return List;
}());
exports.List = List;
//# sourceMappingURL=list.js.map