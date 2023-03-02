"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogError = void 0;
var logger_1 = require("../logger");
var LogError = /** @class */ (function () {
    function LogError() {
    }
    LogError.prototype.log = function (message) {
        logger_1.setLog.error(message, { hello: 'hello' });
    };
    return LogError;
}());
exports.LogError = LogError;
//# sourceMappingURL=logError.js.map