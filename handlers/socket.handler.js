"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
var enums_1 = require("../common/enums");
var SocketHandler = /** @class */ (function () {
    function SocketHandler(io, db, reorderService, logData) {
        this.io = io;
        this.db = db;
        this.reorderService = reorderService;
        this.logData = logData;
    }
    SocketHandler.prototype.updateLists = function () {
        this.io.emit(enums_1.ListEvent.UPDATE, this.db.getData());
    };
    return SocketHandler;
}());
exports.SocketHandler = SocketHandler;
//# sourceMappingURL=socket.handler.js.map