import { LogError } from "./subscribers/logError";
import { LogFile } from "./subscribers/logFile";
export class LogData {
    public message: string;
    public logFileSubscribe: LogFile[];
    public errorSubscribes: LogError[];
	constructor() {
		this.message = '';
		this.logFileSubscribe = [];
        this.errorSubscribes = [];
	}

	setError(error: string) {
		this.message = error;
		this.notifyError();
	}
    setMessage(message: string) {
		this.message = message;
		this.notifyMessage();
	}

	notifyError() {
		return this.errorSubscribes.forEach(subs => subs.log(this.message));
	}

    notifyMessage() {
		return this.logFileSubscribe.forEach(subs => subs.log(this.message));
	}

	registerError(observer: LogError) {
		this.errorSubscribes.push(observer);
	}
	registerMessage(observer: LogFile) {
		this.logFileSubscribe.push(observer);
	}
};