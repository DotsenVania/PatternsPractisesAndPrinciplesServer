import { setLog } from "../logger";

export class LogError {
  public log(message: string): void {
    setLog.error(message, {hello: 'hello'});
  }
}
