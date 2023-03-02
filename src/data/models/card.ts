import { randomUUID } from "crypto";

class Card {
  public id: string;

  public name: string;

  public description: string;

  public createAt: Date;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.createAt = new Date();
    this.id = randomUUID();
  }
  public clone() {
    return new Card(this.name, this.description);
  }

  public changeName(value: string) {
    this.name = value;
    return this;
  } 
  public changeDescription(value: string) {
    this.description = value;
    return this;
  } 
}

export { Card };
