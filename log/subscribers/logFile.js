"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFile = void 0;
var logger_1 = require("../logger");
var LogFile = /** @class */ (function () {
    function LogFile() {
    }
    LogFile.prototype.log = function (message) {
        logger_1.setLog.info(message);
    };
    return LogFile;
}());
exports.LogFile = LogFile;
//# sourceMappingURL=logFile.js.map