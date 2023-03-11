import { ILogger, Severity } from './types';

export class TelegramLogger implements ILogger {
    
    severityLevel: Severity;
    apiUrl: string = 'https://api.telegram.org';
    botToken: string;
    chatId: string;

    constructor(
        severityLevel: Severity = Severity.ERROR,
        botToken: string,
        chatId: string
    ) {
        this.severityLevel = severityLevel;
        this.botToken = botToken;
        this.chatId = chatId
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
        if (severity >= this.severityLevel) {
            fetch(`${this.apiUrl}/bot${this.botToken}/sendMessage?chat_id${this.chatId}&text=${message}&parse_mode=HTML`, {
                method: 'GET'
            });
        }
    }
}