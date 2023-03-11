import { Entity } from './entity';
import { EntityMetadata } from './metadata';
import { Validation } from './validation';
import { EntityState } from './state';
import { field, pk } from './decorators/field';
import { EntityConstructor } from './types';

export function assignItem<T>(obj: any, ctor: EntityConstructor<T>): T {
    let item = new ctor(obj);
    return item;
}

export function assignList<T>(list: any[], ctor: EntityConstructor<T>): T[] {
    var items: T[] = new Array<T>();
    list.forEach(x => items.push(assignItem(x, ctor)));

    return items;
}

export function assign<T>(obj: any, ctor: EntityConstructor<T>): T | T[] {
    return Array.isArray(obj) ? assignList(obj as Array<any>, ctor) : assignItem(obj, ctor);
}

export function isEntity(model?: any): model is Entity {
    return model instanceof Entity;
}  

type E = Entity & { [k: string]: any };
export function asObject<T extends E>(item: T, exclusion: boolean = true) {

    let raw: any = {};

    metadata(item).fields.forEach((f, key) => {

        if (exclusion && f.excluded) {
            return;
        }

        if (item[key] !== undefined && item[key] !== null) {

            raw[key] = item[key];

            if (f.entity !== undefined) {

                if (Array.isArray(item[key])) {
                    let temp: any[] = [];
                    (item[key] as []).map(x => temp.push(asObject(new f.entity!(x), exclusion)));
                    raw[key] = temp;
                } else {
                    raw[key] = asObject(new f.entity(item[key]), exclusion);
                }
            }
        }
    });

    return raw;
}

export function asJSON<T extends Entity>(item: T, exclusion: boolean = true): string {

    return JSON.stringify(asObject(item, exclusion));
}

export function asJSONCollection<T extends Entity>(list: T[], exclusion: boolean = true): string {

    let listJson: string[] = [];
    list.map((item: T) => listJson.push(asJSON(item, exclusion)));
    return '[' + listJson.join(',') + ']';
}

export function asBlob<T extends Entity>(item: T, exclusion: boolean = true): Blob {

    return new Blob([asJSON(item, exclusion)], { type: 'application/json' });
}

export function resource<T extends Entity> (item: T) {

    return metadata(item).resource;
}

export function fieldErrors<T extends Entity> (item: T, propertyName: string) {

    return Validation.get(item)?.fieldErrors(propertyName);
}

export function rollback<T extends Entity> (item: T) {
    EntityState.get(item).rollback();
}

export function commit<T extends Entity> (item: T) {

    Validation.get(item)?.reset();
    EntityState.get(item).init(asObject(item, false));
}

export function validate<T extends Entity> (item: T) {

    let ev = Validation.get(item);
    return ev !== null ? ev.validate() : true;
    // return Validation.get(item)?.validate();
}

export function validateField<T extends Entity> (item: T, propertyName: string) {
    return Validation.get(item)?.validateField(propertyName);
}

export function clone<T extends Entity> (item: T) {
    let ctor = Object.getPrototypeOf(item).constructor as EntityConstructor<T>;
    return new ctor(asObject(item, false));
}

export function metadata<T extends Entity>(item: T) {

    // non utilizzare perchè produce degli errori a runtime
    // per gestire i metadati anche negli oggetti non Entity
    // return (item['__metadata'] as EntityMetadata);

    // questo metodo è pericoloso se utilizzo direttamente la classe Entity anzichè una sua specializzazione
    return EntityMetadata.forTarget(Object.getPrototypeOf(item).constructor);
}

export function metadataCtor<T extends Entity>(ctor: EntityConstructor<T>) {

    return EntityMetadata.forTarget(ctor);
}