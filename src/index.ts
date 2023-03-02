import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { lists } from "./assets/mockData";
import { Database } from "./data/database";
import { CardHandler } from "./handlers/card.handler";
import { ListHandler } from "./handlers/list.handler";
import { ReorderService } from "./services/reorder.service";
import { LogData } from "./log/observer";
import { LogError } from "./log/subscribers/logError";
import { LogFile } from "./log/subscribers/logFile";
import { ReorderProxyService } from "./services/reorder-proxy.service";

// PATTERN: Observer
export const logData = new LogData();
logData.registerError(new LogError());
logData.registerMessage(new LogFile());

const PORT = 3001;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const db = Database.Instance;
const reorderService = new ReorderService();
const reorderProxyService = new ReorderProxyService(reorderService, logData);
if (process.env.NODE_ENV !== "production") {
  db.setData(lists);
}

const onConnection = (socket: Socket): void => {
  new ListHandler(io, db, reorderProxyService, logData).handleConnection(socket);
  new CardHandler(io, db, reorderProxyService, logData).handleConnection(socket);
};

io.on("connection", onConnection);

httpServer.listen(process.env.PORT || PORT, () => console.log("listening on port: " + PORT));

export { httpServer };
