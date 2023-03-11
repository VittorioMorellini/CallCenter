export type PropertyAccessor<TObject, TValue> = (object: TObject) => TValue;

export function valueOrUndefined <T> (item: T, func: (item: T) => any) {
    return item !== undefined ? func(item) : undefined;
}

export function propertyName<T, V extends keyof T>(model: (x: T) => V): string {

    // model dovrebbe essere nella forma
    // function (x) {
    //     return item.cognome;   
    // }

    let token =  model.toString().split('.');
    let key = token[1];

    if (token.length > 2) {
        for (let i = 2; i < token.length; i++) {
            key += '.' + token[i];
        }
    }

    key = key.replace(';', '').replace('}', '').replace('\r', '').replace('\n', '').replace('\t', '').trim();
    return key;
}