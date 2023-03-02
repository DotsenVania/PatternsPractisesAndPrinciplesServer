import type { Socket } from "socket.io";

import { ListEvent } from "../common/enums";
import { List } from "../data/models/list";
import { SocketHandler } from "./socket.handler";

export class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.DELETE, this.deleteList.bind(this));
    socket.on(ListEvent.UPDATE, this.updateList.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const lists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      lists,
      sourceIndex,
      destinationIndex
    );
    this.db.setData(reorderedLists);
    this.updateLists();
  }

  private createList(name: string): void {
    const lists = this.db.getData();
    const newList = new List(name);
    this.db.setData(lists.concat(newList));
    this.logData.setMessage(
      "List was created successfully:" + JSON.stringify(newList)
    );
    this.updateLists();
  }

  private deleteList(listId: string): void {
    const lists = this.db.getData();
    const newListData = lists.filter((list) => list.id !== listId);
    this.db.setData(newListData);
    this.logData.setMessage(`List by id: ${listId} deleted successfully`);
    this.updateLists();
  }

  private updateList(listId: string, name: string): void {
    const lists = this.db.getData();
    const newListData = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, name };
      }
      return list;
    });
    this.db.setData(newListData);
    this.updateLists();
  }
}
