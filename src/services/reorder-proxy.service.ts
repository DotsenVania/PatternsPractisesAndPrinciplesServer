import { List } from "../data/models/list";
import { ReorderInterface } from "./reorderInterface";
import { ReorderService } from "./reorder.service";
import { LogData } from "../log/observer";

// PATTERN: Proxy
export class ReorderProxyService extends ReorderInterface {
  private reorderService: ReorderService;

  private logData: LogData;

  constructor(reorderService: ReorderService, logData: LogData) {
    super();
    this.reorderService = reorderService;
    this.logData = logData;
  }

  public reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
    this.logData.setMessage(`Reorder params: items - ${items}, startIndex - ${startIndex}, endIndex - ${endIndex}`);
    return this.reorderService.reorder(items, startIndex, endIndex);
  }

  public reorderCards({
    lists,
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    lists: List[];
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): List[] {
    this.logData.setMessage(`Reorder params: lists - ${lists}, sourceIndex - ${sourceIndex}, destinationIndex - ${destinationIndex}, sourceListId - ${sourceListId}, destinationListId - ${destinationListId}`);

    return this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
  }
}
