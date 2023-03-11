import { Entity } from './entity';
import { EntityMetadata, FieldMetadata } from './metadata';
import { ListUtils } from '../utils';
import { EntityUtils } from '.';
import { ValidationError } from './types';

export class Validation<T> {

    errors: ValidationError[] = [];

    obj: T;
    metadata: EntityMetadata;

    // anzichè richiedere un entity, mi basta un obj generico, perchè così posso utilizzare queste funzionalità 
    // anche in oggetti non entity tipo nei PdfForm
    constructor(obj: T, metadata: EntityMetadata) {
        this.obj = obj;
        this.metadata = metadata;
    }

    static get<T extends Entity>(item: T)
    {
        // per gestire la validazione anche negli oggetti non Entity
        return item['__validation'] as Validation<T>

        // if (EntityUtils.isEntity(item)) {
        //     return (item['__validation'] as Validation<T>);
        // }
        // else {
        //     return null;
        // }
    }

    validate = (): boolean => {

        this.reset();

        let valid = true;    
        this.metadata.fields.forEach((field, propertyName) => {
            if (!this.validateField(propertyName, field)) {
                valid = false;
            }
        });

        return valid;
    }

    validateField = (propertyName: string, f?: FieldMetadata) => {

        f = f || this.metadata.fields.get(propertyName);
        if (f === undefined) {
            throw new Error(`${propertyName}: field metadata not found`)
        }

        let valid = true;
        let value = (this.obj as any)[propertyName];

        if (f.required) {
           
            switch (typeof value) {
                case 'undefined':
                    valid = false;
                    break;
                case 'boolean':
                    valid = value;
                    break;
                case 'string':
                    valid = value !== null && value !== '';
                    break;
                default:
                    break;
            }

            if (!valid) {

                let e = this.errors.find(x => x.name === propertyName);
                if (e === undefined) {
                    e = { name: propertyName };
                    this.errors.push(e)
                }

                e.required = f.requiredErrorMessage || 'common:required';
            }
        }

        if (f.regex) {
      
            if (value !== null && value !== undefined && !f.regex.test(value.toString())) {

                valid = false;

                let e = this.errors.find(x => x.name === propertyName);
                if (e === undefined) {
                    e = { name: propertyName };
                    this.errors.push(e)
                }

                e.regex = f.regexErrorMessage || 'common:regex';;
            }
        }

        if (valid) {
            ListUtils.remove(this.errors, x => x.name === propertyName);
        }

        return valid;
    }

    hasFieldErrors = (propertyName: string) => {
        return this.errors.find(x => x.name === propertyName) !== undefined;
    }

    fieldErrors = (propertyName: string) => {

        return this.errors.find(x => x.name === propertyName);
    }

    /*errors = () => {

        let errors: any = undefined;
        if (this.state !== undefined) {
            errors = [];
            for (var key in this.state) {
                if (this.state.hasOwnProperty(key)) {
                    // TODO pensare ad i18n
                    errors.push('Required', { name: '$t(entities:' + this.metadata.resource + '.' + key + ')' });
                    // errors.push(i18n.t('common:fieldRequired', { name: '$t(entities:' + this.getResource() + '.' + key + ')' }));
                }
            }
        }
        
        return errors;
    }*/

    reset() {
        this.errors = [];
    }
}