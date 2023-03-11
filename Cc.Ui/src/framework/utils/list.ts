export function getComplement<T>(source: T[], items: T[], func: (item: T) => any, current?: T) {

    let list: any = [];

    if (current !== undefined && func(current) != null) {
        list.push(source.find(x => func(x) === func(current)));
    }

    source.forEach(t => {
        if (!items.find(x => func(x) === func(t))) {
            list.push(t);
        }
    });

    return list;
}
    
export function remove<T>(source: T[], predicate: (value: T) => boolean) {

    let index = source.findIndex(predicate);
    if (index > -1) {
        source.splice(index, 1);
    }

    return source;
}

export function replace<T>(source: T[], predicate: (value: T) => boolean, replacer: T) {

    let index = source.findIndex(predicate);
    if (index > -1) {
        source.splice(index, 1, replacer);
    }

    return source;
}

export function add<T>(source: T[], replacer: T) {

    source.push(replacer);

    return source;
}

export function addOrReplace<T>(source: T[], predicate: (value: T) => boolean, replacer: T) {

    let index = source.findIndex(predicate);
    if (index > -1) {
        source.splice(index, 1, replacer);
    } else {
        source.push(replacer);
    }

    return source;
}

export function min<T>(source: T[], predicate: (value: T) => number) {

    let result: any = undefined;
    if (source != null && source.length > 0) {
        source.forEach(x => {
            let value = predicate(x);
            result = result || value;
            if (value < result) {
                result = value;
            }
        });
    }

    return result || 0;
}

export function max<T>(source: T[], predicate: (value: T) => number) {

    let result: any = undefined;
    if (source != null && source.length > 0) {
        source.forEach(x => {
            let value = predicate(x);
            result = result || value;
            if (value > result) {
                result = value;
            }
        });
    }

    return result || 0;
}

export function sum<T>(source: T[], predicate: (value: T) => number) {

    let result = 0;
    if (source != null && source.length > 0) {
        source.forEach(x => { result += predicate(x); });
    }

    return result;
}
    
export function sort<T>(list: T[], predicate: (value: T) => any, desc: boolean = false) {

    let o1 = desc ? 1 : -1;
    let o2 = desc ? -1 : 1;
    return list.sort((a: T, b: T) => 
        predicate(a) < predicate(b) ? o1 : predicate(a) > predicate(b) ? o2 : 0
    );
}

export function distinct<T>(list: T[], predicate: (value: T) => any) {

    return Array.from(new Set(list.map(x => predicate(x))));
}

export function take<T>(list: T[], count: number) {
    
    return list.slice(0, count);
}