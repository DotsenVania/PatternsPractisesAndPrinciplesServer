import { randomUUID } from 'crypto';

import { Card } from './card';

class List {
  public id: string;

  public name: string;

  public cards: Card[] = [];
  // Card[] = []

  public constructor(name: string) {
    this.name = name;
    this.id = randomUUID();
  }
}

export { List };
