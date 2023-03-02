"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLog = void 0;
var bunyan_1 = require("bunyan");
exports.setLog = (0, bunyan_1.createLogger)({
    name: "log",
    streams: [
        {
            level: "info",
            path: './logger.log'
        },
        {
            stream: process.stdout,
            level: "error",
        }
    ]
});
//# sourceMappingURL=logger.js.map