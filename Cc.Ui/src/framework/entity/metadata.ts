import { metadata } from '../utils';
import { EntityConstructor } from './types';

export class FieldMetadata {

    [key: string]: any;

    propertyName: string;

    pk: boolean = false
    label?: string;
    labelResource: string;     // i18n resource key    
    excluded: boolean = false; // prevents from being serialized    
    readonly: boolean = false; // prevents from being modified 
    json: boolean = false;
    entity: EntityConstructor<any> | undefined = undefined;
    required: boolean = false;
    requiredErrorMessage?: string;
    regex?: RegExp;
    regexErrorMessage?: string;

    // private i18n: I18N;

    constructor(propertyName: string) {

        this.propertyName = propertyName;
        // this.i18n = Container.instance.get(I18N);

        this.labelResource = '{resource}.' + propertyName;
    }

    put(key: string, value: any) {
        this[key] = value;
    }

    getLabel(): string {

        let l = '';

        if (this.label != null) {
            l = this.label;
        } else if (this.labelResource != null) {

            // TODO i18n
            // l = this.i18n.tr(this.labelResource.replace('{resource}', this.getParent().resource), { ns: 'entity' });
        }

        return l;
    }
}

export class AssociationMetadata {

    propertyName: string;

    entityReferenceType: any;
    entityReferencePropertyName: string | undefined;
    cache: any | undefined;
    entityReferenceTypeFn: any;

    constructor(propertyName: string, entityReferenceType: any, entityReferencePropertyName?: string, cache?: (id: string) => any) {

        this.propertyName = propertyName;
        this.entityReferenceType = entityReferenceType;
        this.entityReferencePropertyName = entityReferencePropertyName;
        this.cache = cache;
    }

    get isCollection() {

        return this.entityReferencePropertyName == null;
    }
}

export class EntityMetadata {

    static key = 'sx:entity:metadata';
    static forTarget(target: any): EntityMetadata {        
        return metadata.getOrCreateOwn(EntityMetadata.key, EntityMetadata, target, target.name) as EntityMetadata;
    }
    static forTargetProperty(target: any): EntityMetadata {
        return EntityMetadata.forTarget(target.constructor);
    }

    [key: string]: any;

    resource: string;
    id: string;
    fields: Map<string, FieldMetadata>;
    associations: Map<string, AssociationMetadata>;

    constructor() {

        this.fields = new Map();
        this.associations = new Map();
        this.id = '';
        this.resource = '';
    }

    put(key: string, value: any) {
        this[key] = value;
    }

    putField(propertyName: string, keyOrValue: string | any, value?: any) {

        if (!this.fields.has(propertyName)) {
            this.fields.set(propertyName, new FieldMetadata(propertyName));
        }
        if (typeof value === 'undefined') {
            Object.assign(this.fields.get(propertyName), keyOrValue);
        } else {
            let x = this.fields.get(propertyName);
            if (x !== undefined) {
                x[keyOrValue] = value;
            }
        }
    }

    putAssociation(propertyName: string, value: AssociationMetadata) {
        this.associations.set(propertyName, value);
    }
}