import { EntityMetadata, /*FieldMetadata, */AssociationMetadata } from '../metadata';
import { Entity } from '../entity';
import { EntityConstructor } from '../types';
// import { PropertyAccessor } from '../../utils/property';

export function field(value?: any) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, value);
    };
}

export function pk() {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'pk', true);
        EntityMetadata.forTargetProperty(target).put('id', propertyKey);
    };
}

export function label(value: any) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'label', value);
    };
}

export function excluded() {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'excluded', true);
    };
}

export function readonly() {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'readonly', true);
    };
}

export function json() {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'json', true);
    };
}

// serve per far si che la property venga serializzata in output e benefici della gestione dello stato coi rollback
export function entity<TEntity extends Entity>(entityReferenceType: EntityConstructor<TEntity>) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'entity', entityReferenceType);
    };
}

export function required(errorMessage?: string) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'required', true);
        if (errorMessage !== undefined) {
            EntityMetadata.forTargetProperty(target).putField(propertyKey, 'requiredErrorMessage', errorMessage);
        }
    };
}

export function requiredErrorMessage(value: string) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'requiredErrorMessage', value);
    };
}

export function regex(value: RegExp, errorMessage?: string) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'regex', value);
        if (errorMessage !== undefined) {
            EntityMetadata.forTargetProperty(target).putField(propertyKey, 'regexErrorMessage', errorMessage);
        }
    };
}

export function regexErrorMessage(value: string) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putField(propertyKey, 'regexErrorMessage', value);
    };
}

// export function association<TEntityRef, TObject, TValue>(entityReferenceType: TEntityRef, accessor?: PropertyAccessor<TObject, TValue>) {
// export function association<TEntity extends Entity, TObject, TValue>(entityReferenceType: EntityConstructor<TEntity>, accessor?: string) {

// le association non vengono serializzate in output (lo sono solo i field)
// se serve la serializzazione bigogna usare in aggiunta il decorator entity
export function association<TEntity extends Entity>(entityReferenceType: EntityConstructor<TEntity>, accessor?: string, cache?: (id: string | number) => any) {

    return function (target: Object, propertyKey: string) {

        EntityMetadata.forTargetProperty(target).putAssociation(propertyKey, new AssociationMetadata(propertyKey, entityReferenceType, accessor, cache));
    };
}

export function associationEvo<TEntity extends Entity>(entityReferenceTypeFn: () => Promise<EntityConstructor<TEntity> | undefined>, accessor?: string, cache?: (id: string | number) => any) {

    return function (target: Object, propertyKey: string) {

        let am = new AssociationMetadata(propertyKey, entityReferenceTypeFn, accessor, cache);
        am.entityReferenceTypeFn = entityReferenceTypeFn;
        EntityMetadata.forTargetProperty(target).putAssociation(propertyKey, am);
    };
}