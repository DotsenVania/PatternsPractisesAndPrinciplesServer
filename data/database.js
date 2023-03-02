"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var Database = /** @class */ (function () {
    function Database() {
        this.data = [];
    }
    Object.defineProperty(Database, "Instance", {
        get: function () {
            if (!this.instance) {
                this.instance = new Database();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    Database.prototype.setData = function (data) {
        this.data = data;
    };
    Database.prototype.getData = function () {
        return this.data;
    };
    Database.instance = null;
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map