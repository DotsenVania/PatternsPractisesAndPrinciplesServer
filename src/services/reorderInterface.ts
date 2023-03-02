import { List } from '../data/models/list';

export abstract class ReorderInterface {
  public abstract reorder<T>(items: T[], startIndex: number, endIndex: number): T[] 

  public  abstract reorderCards({
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
  }): List[] ;
}