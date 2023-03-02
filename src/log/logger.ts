import { createLogger } from "bunyan";

export const setLog = createLogger({
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
})