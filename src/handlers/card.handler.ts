import type { Socket } from "socket.io";
import { randomUUID } from "crypto";

import { CardEvent } from "../common/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

export class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DELETED, this.deleteCard.bind(this));
    socket.on(CardEvent.RENAME, this.renameCard.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeDescription.bind(this));
    socket.on(CardEvent.CLONE, this.cloneCard.bind(this));
  }

  public createCard(listId: string, cardName: string, description = ""): void {
    const newCard = new Card(cardName, description);
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);
    if (!list) {
      this.logData.setError(`List by id: ${list.id} not found`);
      return;
    }
    const updatedList = { ...list, cards: list.cards.concat(newCard) };
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.logData.setMessage(
      "Card was created successfully:" + JSON.stringify(newCard)
    );
    this.updateLists();
  }

  // PATTERN: Prototype
  public cloneCard(listId: string, cardId: string) {
    const lists = this.db.getData();

    const list = lists.find((list) => list.id === listId);
    if (!list) {
      this.logData.setError(`List by id: ${listId} not found`);
      return;
    }
    const oldCard = list.cards.find((card: Card) => card.id === cardId);

    const newCard = oldCard.clone(); // Clone card

    const updatedList = { ...list, cards: list.cards.concat(newCard) };
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );

    this.logData.setMessage(
      "Card was cloned successfully:" + JSON.stringify(newCard)
    );
    this.updateLists();
  }

  public deleteCard(listId: string, cardId: string) {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) {
      this.logData.setError(`List by id: ${listId} not found`);
      return;
    }

    const updatedList = {
      ...list,
      cards: list.cards.filter((cart) => cart.id !== cardId),
    };
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );

    this.logData.setMessage(`Card by id: ${cardId} deleted successfully`);
    this.updateLists();
  }

  public renameCard(listId: string, cardId: string, value: string): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) {
      this.logData.setError(`List by id: ${listId} not found`);
      return;
    }
    const updatedList = {
      ...list,
      cards: list.cards.map((card) => {
        if (card.id === cardId) {
          card.changeName(value);
          return card;
        }
        return card;
      }),
    };

    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );

    this.updateLists();
  }

  public changeDescription(
    listId: string,
    cardId: string,
    value: string
  ): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) {
      this.logData.setError(`List by id: ${listId} not found`);
      return;
    }
    const updatedList = {
      ...list,
      cards: list.cards.map((card) => {
        if (card.id === cardId) {
          return card.changeDescription(value);
        }
        return card;
      }),
    };

    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.updateLists();
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }
}
