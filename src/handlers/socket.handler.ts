import { Server, Socket } from 'socket.io';

import { ListEvent } from '../common/enums';
import { Database } from '../data/database';
import { LogData } from '../log/observer';
import { ReorderInterface } from '../services/reorderInterface';
abstract class SocketHandler {
  protected db: Database;

  protected reorderService: ReorderInterface;

  protected io: Server;

  protected logData: LogData;

  public constructor(io: Server, db: Database, reorderService: ReorderInterface, logData: LogData) {
    this.io = io;
    this.db = db;
    this.reorderService = reorderService;
    this.logData = logData;
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export { SocketHandler };
