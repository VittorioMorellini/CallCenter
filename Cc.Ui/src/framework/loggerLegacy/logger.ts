import { ILogger, Severity } from './types';

export class Logger implements ILogger {

    key: string = '';
    loggers: ILogger[] = [];

    constructor(list: Array<ILogger>) {
        this.loggers = list;
    }

    debug(message?: any, ...optionalParams: any[]) {
        return this.log(Severity.DEBUG, message, ...optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        return this.log(Severity.INFO, message, ...optionalParams);
    }

    warning(message?: any, ...optionalParams: any[]) {
        return this.log(Severity.WARNING, message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        return this.log(Severity.ERROR, message, ...optionalParams);
    }

    log(severity: Severity, message: any, ...optionalParams: any[]) {
        this.loggers.map((l: ILogger) => {
            l.log(severity, message, optionalParams);
        });
    }
}

export interface LogData {
    key: string;
    exception: any;
}