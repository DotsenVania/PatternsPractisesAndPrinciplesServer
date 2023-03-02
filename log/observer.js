"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogData = void 0;
var LogData = /** @class */ (function () {
    function LogData() {
        this.message = '';
        this.logFileSubscribe = [];
        this.errorSubscribes = [];
    }
    LogData.prototype.setError = function (error) {
        this.message = error;
        this.notifyError();
    };
    LogData.prototype.setMessage = function (message) {
        this.message = message;
        this.notifyMessage();
    };
    LogData.prototype.notifyError = function () {
        var _this = this;
        return this.errorSubscribes.forEach(function (subs) { return subs.log(_this.message); });
    };
    LogData.prototype.notifyMessage = function () {
        var _this = this;
        return this.logFileSubscribe.forEach(function (subs) { return subs.log(_this.message); });
    };
    LogData.prototype.registerError = function (observer) {
        this.errorSubscribes.push(observer);
    };
    LogData.prototype.registerMessage = function (observer) {
        this.logFileSubscribe.push(observer);
    };
    return LogData;
}());
exports.LogData = LogData;
;
//# sourceMappingURL=observer.js.map