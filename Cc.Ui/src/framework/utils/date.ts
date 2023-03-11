import moment from 'moment';

// preventivamente imposto la localizzaione di moment pari al browser
// questo è necessario poichè le date create prima del caricamento dell'i18n non risentirebbero dell'impostazione che viene fatta nell'init
// non è il massimo, ma non sono riuscito a trovare una modalità migliore
moment.locale(window.navigator.language);

export { moment };

export function now(): string {
    return moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
}
export function utcNow(): string { 
    return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS');
}

export function dateNow(): Date {
    return moment().toDate();
}

export function dateUtcNow(): Date {
    return moment.utc().toDate();
}

export function formatUTC(date: moment.Moment): string {

    return moment(date).add(moment(date).utcOffset(), 'm').utc().format();
}

export function formatDate(date: string, format?: string) {
    // TODO: localizzata
    return date ? moment(date).format(format || 'DD/MM/yyyy') : '';
}

export function formatDateTime(date: string, format?: string) {
    // TODO: localizzata
    return date ? moment(date).format(format || 'DD/MM/yyyy HH:mm') : '';
}

export function formatDateTimeFull(date: string, format?: string) {
    // TODO: localizzata
    return date ? moment(date).format(format || 'DD/MM/yyyy HH:mm:ss.SSS') : '';
}