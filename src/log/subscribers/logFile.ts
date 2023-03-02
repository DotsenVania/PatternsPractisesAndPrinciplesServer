import { setLog } from "../logger";
export class LogFile {
    
    public log (message: string): void {
        setLog.info(message);
    }
}