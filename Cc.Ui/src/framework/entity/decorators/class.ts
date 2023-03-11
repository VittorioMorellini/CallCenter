import { EntityMetadata } from '../metadata';

export function id(value: any) {

    return function (target: Object) {

        EntityMetadata.forTarget(target).put('id', value);
    };
}

export function resource(value: any) {

    return function (target: Object) {

        EntityMetadata.forTarget(target).put('resource', value);
    };
}