import { Entity } from './entity';
import { EntityMetadata } from './metadata';
import { EntityUtils } from '.';

function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}
export class EntityState {

    state = {};
    obj: Entity;
    metadata: EntityMetadata;

    constructor(obj: Entity, metadata: EntityMetadata) {
        this.obj = obj;
        this.metadata = metadata;
    }

    static get<T extends Entity>(item: T)
    {
        return (item['__state'] as EntityState);

        // if (EntityUtils.isEntity(item)) {
        //     return (item['__state'] as EntityState);
        // }
        // else {
        //     throw new Error('EntityState undefined, item is not an Entity')
        // }
    }

    init = async (data?: any) => {
        
        let { obj } = this as { [k: string]: any };

        if (data != null) {

            Object.assign(obj, data);

            this.metadata.fields.forEach((field, propertyKey) => {

                try
                {
                    if (field.json === true) {
                        if (!isNullOrUndefined(obj[propertyKey])) {
                            obj[propertyKey] = JSON.parse(obj[propertyKey]);
                        }
                    } else if (field.entity !== undefined) {
                        if (!isNullOrUndefined(obj[propertyKey])) {

                            if (obj[propertyKey].constructor === Array) {
                                let tmp: any[] = [];
                                let j = Array.isArray(obj[propertyKey]) ? obj[propertyKey] : JSON.parse(obj[propertyKey]);
                                (j as any[]).forEach(o => tmp.push(new field.entity!(o)));
                                obj[propertyKey] = tmp;
                            } else {
                                obj[propertyKey] = new field.entity(obj[propertyKey]);
                            }
                        }
                    }
                } catch (ex) {
                    console.error('EntityState - field', obj, field, propertyKey)
                    throw ex; 
                }  
            });

            // imposto lo stato iniziale dell'entity
            this.state = EntityUtils.asObject(obj, false);

            // eseguo il cast ad Entity delle eventuali associazioni
            this.metadata.associations.forEach(async (association, propertyKey) => {
                try
                {
                    if (isNullOrUndefined(obj[propertyKey]) && // recupero il valore dalla cache solo se l'elemento è nullo
                        association.cache !== undefined && 
                        !association.isCollection) {
                        // let cacheValue = await association.cache(obj[association.entityReferencePropertyName as string]);
                        // if (Promise.resolve(cacheValue) === cacheValue) {
                        //     cacheValue.then((x: any) => obj[propertyKey] = x);
                        // } else {
                        //     obj[propertyKey] = cacheValue;
                        // }
                        obj[propertyKey] = await association.cache(obj[association.entityReferencePropertyName as string]);
                    }

                    if (obj[propertyKey] !== undefined) {
                        //let associationCtor = association.entityReferenceTypeFn ? await association.entityReferenceTypeFn() : association.entityReferenceType;
                        let associationCtor = association.entityReferenceType;
                        if (association.entityReferenceTypeFn) {
                            associationCtor = await association.entityReferenceTypeFn();
                        }
                        
                        if (association.isCollection) {
                            let tmp: any[] = [];
                            let j = Array.isArray(obj[propertyKey]) ? obj[propertyKey] : JSON.parse(obj[propertyKey]);
                            (j as any[]).forEach(o => tmp.push(new associationCtor(o)));
                            obj[propertyKey] = tmp;
                        } else if (!EntityUtils.isEntity(obj[propertyKey])) {
                            obj[propertyKey] = new associationCtor(obj[propertyKey]);
                        }
                    } 
                } catch (ex) {
                    console.error('EntityState - association', obj, association, propertyKey)
                    throw ex; 
                }                
            });
        }

        return obj;
    }

    rollback = () => {
        
        this.init(this.state);
    }

    isChanged = () => EntityUtils.asJSON(this.obj, false) === JSON.stringify(this.state);
}