import { ILogger, Severity } from './types';

class ConsoleLogger implements ILogger {
    
    severityLevel: Severity;
    constructor(severityLevel: Severity = Severity.DEBUG) {
        this.severityLevel = severityLevel;
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
    // tslint:disable-next-line:no-shadowed-variable
    log(severity: Severity, message: any, ...optionalParams: any[]) {
        switch (severity) {
            case Severity.DEBUG:
                if (severity >= this.severityLevel) {
                    console.log(message, ...optionalParams);
                }
                break;
            case Severity.INFO:
             if (severity >= this.severityLevel) {
                    console.info(message, ...optionalParams);
                }
                // tslint:disable-next-line:align
                break;
            case Severity.WARNING:
                if (severity >= this.severityLevel) {
                    console.warn(message, ...optionalParams);
                }
                break;
            case Severity.ERROR:
                if (severity >= this.severityLevel) {
                    console.error(message, ...optionalParams);
                }
                break;
            default:
                break;
        }
    }
}

const severity = process.env.NODE_ENV === 'production' ? Severity.INFO : Severity.DEBUG;
export default new ConsoleLogger(severity);