import { Entity } from './entity';
import { EntityUtils } from '.';
import { EntityConstructor, EntityStorageProps } from './types';

export const EntityStorage = {
    set: (key: string, value: Entity | Entity[], ttl: number) => {

        let v = Array.isArray(value) ? EntityUtils.asJSONCollection(value) : EntityUtils.asJSON(value);
        var data = { value: v, expiresAt: new Date().getTime() + ttl / 1 };
        try {
            localStorage.setItem(key, JSON.stringify(data));
        }
        catch(e) {
            console.log(`Error setting localStorage item: ${key}`, e);
        }
    },
    get: (key: string) => {

        let v = localStorage.getItem(key);
        let data = v !== null ? JSON.parse(v) : undefined;

        if (data !== null && data !== undefined) {
            if (data.expiresAt !== null && data.expiresAt < new Date().getTime()) {
                localStorage.removeItem(key);
            } else {
                return JSON.parse(data.value);
            }
        }
        return null;
    },
    load: (key: string, fn: () => Promise<Entity[]>, props?: EntityStorageProps | boolean) => {

        let options: EntityStorageProps = { disabled: false };
        if (typeof props === 'boolean') {
            options = props === true ? options : { disabled: true };
        } else {
            options = (props as EntityStorageProps) || options;
        }       

        if (!localStorage || options.disabled) {
            return fn();
        }

        let storageKey = `sx-cache:${options.prefix !== undefined ? `${options.prefix}_${key}` : key}`;
        let ttl = options.ttl || 60 * 60 * 1000;

        let result = EntityStorage.get(storageKey);
        if (result === null) {

            return fn().then(x => {
                EntityStorage.set(storageKey, x, ttl);
                return x;
            });
        } else if (options.ctor !== undefined) {
            return Promise.resolve(EntityUtils.assign(result, options.ctor));
        }
        else {
            return Promise.resolve(result);
        }
    },
    clear: () => {
        if (localStorage) {
            Object.keys(localStorage).forEach((key) => {
                    if (/^sx-cache:/.test(key)) {
                        localStorage.removeItem(key);
                    }
                });
        }
    }
};