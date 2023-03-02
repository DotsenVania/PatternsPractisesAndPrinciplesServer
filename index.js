"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.logData = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var mockData_1 = require("./assets/mockData");
var database_1 = require("./data/database");
var card_handler_1 = require("./handlers/card.handler");
var list_handler_1 = require("./handlers/list.handler");
var reorder_service_1 = require("./services/reorder.service");
var observer_1 = require("./log/observer");
var logError_1 = require("./log/subscribers/logError");
var logFile_1 = require("./log/subscribers/logFile");
var reorder_proxy_service_1 = require("./services/reorder-proxy.service");
// PATTERN: Observer
exports.logData = new observer_1.LogData();
exports.logData.registerError(new logError_1.LogError());
exports.logData.registerMessage(new logFile_1.LogFile());
var PORT = 3001;
var httpServer = (0, http_1.createServer)();
exports.httpServer = httpServer;
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var db = database_1.Database.Instance;
var reorderService = new reorder_service_1.ReorderService();
var reorderProxyService = new reorder_proxy_service_1.ReorderProxyService(reorderService, exports.logData);
if (process.env.NODE_ENV !== "production") {
    db.setData(mockData_1.lists);
}
var onConnection = function (socket) {
    new list_handler_1.ListHandler(io, db, reorderProxyService, exports.logData).handleConnection(socket);
    new card_handler_1.CardHandler(io, db, reorderProxyService, exports.logData).handleConnection(socket);
};
io.on("connection", onConnection);
httpServer.listen(process.env.PORT || PORT, function () { return console.log("listening on port: " + PORT); });
//# sourceMappingURL=index.js.map