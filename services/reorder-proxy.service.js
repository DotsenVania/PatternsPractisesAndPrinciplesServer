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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderProxyService = void 0;
var reorderInterface_1 = require("./reorderInterface");
// PATTERN: Proxy
var ReorderProxyService = /** @class */ (function (_super) {
    __extends(ReorderProxyService, _super);
    function ReorderProxyService(reorderService, logData) {
        var _this = _super.call(this) || this;
        _this.reorderService = reorderService;
        _this.logData = logData;
        return _this;
    }
    ReorderProxyService.prototype.reorder = function (items, startIndex, endIndex) {
        this.logData.setMessage("Reorder params: items - ".concat(items, ", startIndex - ").concat(startIndex, ", endIndex - ").concat(endIndex));
        return this.reorderService.reorder(items, startIndex, endIndex);
    };
    ReorderProxyService.prototype.reorderCards = function (_a) {
        var lists = _a.lists, sourceIndex = _a.sourceIndex, destinationIndex = _a.destinationIndex, sourceListId = _a.sourceListId, destinationListId = _a.destinationListId;
        this.logData.setMessage("Reorder params: lists - ".concat(lists, ", sourceIndex - ").concat(sourceIndex, ", destinationIndex - ").concat(destinationIndex, ", sourceListId - ").concat(sourceListId, ", destinationListId - ").concat(destinationListId));
        return this.reorderService.reorderCards({
            lists: lists,
            sourceIndex: sourceIndex,
            destinationIndex: destinationIndex,
            sourceListId: sourceListId,
            destinationListId: destinationListId,
        });
    };
    return ReorderProxyService;
}(reorderInterface_1.ReorderInterface));
exports.ReorderProxyService = ReorderProxyService;
//# sourceMappingURL=reorder-proxy.service.js.map