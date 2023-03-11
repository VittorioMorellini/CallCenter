export enum Severity {    
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    NONE
}

export interface ILogger {
    log:        (severity: Severity, message?: any, ...optionalParams: any[]) => void;
    debug:      (message?: any, ...optionalParams: any[]) => void;
    info:       (message?: any, ...optionalParams: any[]) => void;
    warning:    (message?: any, ...optionalParams: any[]) => void;
    error:      (message?: any, ...optionalParams: any[]) => void;
}
