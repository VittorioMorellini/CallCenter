import * as React from 'react';
import { FieldProps } from './field';
import { InputField } from './controls/input';
import { DateField } from './controls/date';
import { DateUtils } from '../utils';
import { EntityMetadata } from '../entity';

export type FieldDefinition = {
    name: string;
    rect: number[];
    page: number;
    config?: FieldConfig;
}

export type FieldConfig = {
    type: 'text' | 'date' | 'custom';
    mask?: Array<string> | string;
    helper?: string;
    required?: boolean;
    requiredErrorMessage?: string;    
    regex?: RegExp;
    regexErrorMessage?: string;     
}

const defaultConfig: FieldConfig = {
    type: 'text',
    required: false
};

export async function getPageFields(page: any) {

    let fields: Array<FieldDefinition> = [];

    let annotations = await page.getAnnotations();
    annotations
        .filter((a: any) => a.subtype === 'Widget')
        .sort((a: any, b: any) => a.fieldName < b.fieldName ? -1 : a.fieldName > b.fieldName ? 1 : 0)
        .forEach((a: any, index: number) => {   

            let field: FieldDefinition = {
                name: a.fieldName,
                rect: a.rect,
                page: page.pageNumber
            };

            fields.push(field);
        });
        
    return fields;
}

export async function getDocumentFields(pdf: any) {

    let fields: Array<FieldDefinition> = [];
    for (let i = 1; i <= pdf.numPages; i++) {

        let page = await pdf.getPage(i);
        let pageFields = await getPageFields(page);
        fields.push(...pageFields);
    }

    console.log(fields);
    return fields;
}

export async function exportDocumentFields(pdf: any) {

    let fields: Array<FieldDefinition> = await getDocumentFields(pdf);
    return JSON.stringify(fields, null, 2);
}

export function renderFields(list: Array<FieldDefinition>, page: any, scale: number, model: any) {

    let fields: any[] = [];
    list.forEach((f: FieldDefinition, index: number) => {
        let field = renderField(f, index, page, scale, model);
        if (field !== undefined) {
            fields.push(field);
        }
    });

    return fields;
}

export function renderField(f: FieldDefinition, index: number, page: any, scale: number, model: any) {

    let config = f.config || defaultConfig;
    switch (config.type) {
        case 'text': {
            return (
                <InputField
                    key={index} 
                    rect={f.rect}
                    name={f.name}
                    mask={config.mask}
                    helper={config.helper}
                    required={config.required}
                    requiredErrorMessage={config.requiredErrorMessage}
                    regex={config.regex}
                    regexErrorMessage={config.regexErrorMessage}
                />
            );
        }
        case 'date': {
            return (
                <DateField
                    key={index} 
                    rect={f.rect} 
                    name={f.name}
                    mask={config.mask}
                    helper={config.helper}
                    required={config.required}
                    requiredErrorMessage={config.requiredErrorMessage}
                    regex={config.regex}
                    regexErrorMessage={config.regexErrorMessage}
                    onGetValue={(value: string) => DateUtils.moment(value)}
                    // onSetValue={(value: any) => value.format('DDMMYYYY')}
                />
            );
        }
        default:
            return undefined;
    }
}

export function augmentDefinitionFromComponent<T>(child: any, fd?: FieldDefinition, page?: number): FieldDefinition {
    
    let props: FieldProps<T> = child.props;
    let config: FieldConfig = fd !== undefined && fd.config !== undefined ? fd.config : { type: 'custom'};
    return {
        name: props.name,
        rect: props.rect || (fd !== undefined ? fd.rect : [0, 0, 0, 0]),
        page: fd !== undefined ? fd.page : (page || 1),
        config: {
            type: config.type,
            mask: props.mask || config.mask,
            required: props.required || config.required,
            requiredErrorMessage: props.requiredErrorMessage || config.requiredErrorMessage,
            regex: props.regex || config.regex,
            regexErrorMessage: props.regexErrorMessage || config.regexErrorMessage,
            helper: props.helper || config.helper            
        }
    };
}

// export function augmentEntityMetadata(item: Entity, defs: FieldDefinition[]) {
export function entityMetadataFromFieldDefinition(defs: FieldDefinition[]) {
    
    let metadata: EntityMetadata = new EntityMetadata();
    defs.forEach(def => {

        metadata.putField(def.name, undefined);
        
        if (def.config !== undefined) {

            if (def.config.required !== undefined) {
                metadata.putField(def.name, 'required', def.config.required!);   
            } 
            if (def.config.requiredErrorMessage !== undefined) {
                metadata.putField(def.name, 'requiredErrorMessage', def.config.requiredErrorMessage!);   
            } 
            if (def.config.regex !== undefined) {
                metadata.putField(def.name, 'regex', def.config.regex!);
            }
            if (def.config.regexErrorMessage !== undefined) {
                metadata.putField(def.name, 'regexErrorMessage', def.config.regexErrorMessage!);   
            }               
        }
    });

    return metadata;
}

export function applyRegexMask(mask: string[], value: string) {
    
    let result = '';

    mask.forEach((m: string, index: number) => {
                
        if (m.length > 1 && m.startsWith('/') && m.endsWith('/')) { // m instanceof RegExp
           
            let source = m.substring(1, m.length - 1);

            let regex = new RegExp(source);
            let tokens = regex.exec(value);
            if (tokens !== null && tokens.length > 0) {
                value = value.replace(regex, '');
                result += tokens[0].toString();
            }
        } else {
            result += m;
        }
    });

    return result;
}

export function applyMask(mask: string, value: string) {
    
    let m = 0;
    
    let maskArray = mask.split('');
    let valueArray = value.split('');

    for (let i = 0; i < valueArray.length; i++) {
        for (let j = m; j < maskArray.length; j++) {
            if (maskArray[j] === '§') {
                maskArray[j] = valueArray[i];
                m = i + 1;
                break;
            }
        }
    }

    let result = maskArray.join('');
    result = result.replace(/(§)/g, '').trimRight();
    return  result;
}