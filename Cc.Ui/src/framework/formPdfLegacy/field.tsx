import * as React from 'react';
import { Entity } from '../entity';
import { PropertyUtils } from '../utils';
import { FormContext } from './form';
import { PageContext } from './page';
import { applyRegexMask, applyMask } from './utils';

export type Mode = 'DISPLAY' | 'INPUT';

export interface FieldProps<T> {

    name: string;
    // model?: (x: T) => any;

    rect?: number[]; // se non è specificato leggo quello della definizione
    offset?: number[];
    offsetScale?: number;

    mask?:  string[] | string;
    helper?: string;
    required?: boolean;
    requiredErrorMessage?: string;
    regex?: RegExp;
    regexErrorMessage?: string;

    ControlProps?: any;
    onGetValue?: (valueFromModel: any) => any;
    onSetValue?: (valueToModel:   any) => any;
    // utile per gestire eventuali eventi aggiuntivi (es. Select in cascata)
    onValueChanged?: (value: any, event?: any) => void;
    // onChangeMode?: (mode: Mode, inputRef: any) => void;
    control?: React.ReactElement<any> | ((context: FieldContext<T>) => React.ReactElement<any>);
    // children?: any;
    format?: (valueFromInput: any) => any;
    onSetDisplayValue?: (valueFromInput:   any) => any;
}

export interface FieldContext<T> {
    name: string;
    value: any;
    displayValue: string;
    top: number;
    left: number;
    width: number;
    height: number;
    scale: number;
    offset: number[];
    offsetScale: number;
    error?: string;
    onValueChanged: (value: any, event: any) => any;
    validate: (value: any) => void;
}

export const FieldContext = React.createContext<FieldContext<any>>({} as any);

type FormFieldProps<T> = FieldProps<T> & { 
    form: FormContext<T>,
    page: PageContext,
    control: React.ReactElement<any>,
    children?: any,
};

interface FieldState {
    displayValue: string;
    error?: string;
    lastValidation: number;
}

class Field<T extends Entity> extends React.Component<FormFieldProps<T>, FieldState> {

    state = {
        displayValue: '',
        error: '',
        lastValidation: 0
    };
    
    render() {

        const { name, rect, children, control } = this.props;
        const { item, handleChange, scale, validation } = this.props.form as FormContext<T>;
        const { page } = this.props.page as PageContext;
        const { error } = this.state;

        let offset = this.props.offset || [0, 0];
        let offsetScale = this.props.offsetScale || 0;
        let onGetValue = this.props.onGetValue || ((val) => { return val; });
        let onSetValue = this.props.onSetValue || ((val) => { return val; });
        let onSetDisplayValue = this.props.onSetDisplayValue || ((val) => { return val; });
        let format = this.props.format || (
            (value: any) => {

                if (value === undefined || value === null || value === '') {
                    return '';
                }
        
                value = onSetDisplayValue(value);

                if (this.props.mask !== undefined) {  

                    if (typeof this.props.mask === 'string') {   
                        value = applyMask(this.props.mask.toString(), value);
                    }
                    
                    if (this.props.mask instanceof Array) {  
                        value = applyRegexMask(this.props.mask, value); 
                    }
                }    
        
                return value;
            }
        );
        let getError = () => {
            let errors = validation!.fieldErrors(name);

            if (errors !== undefined) {
                return errors.required ? 'obbligatorio' : errors.regex ? (this.props.regexErrorMessage || 'non valido') : 'generico';
            } else {
                return undefined;
            }
        };
        let validate = (value: any) => {

            validation!.validateField(name);
            this.setState({
                error: getError()
            });
        };

        if (rect === undefined) {
            throw new Error(`Field [${name}]: rect not defined`);
        }

        let r = page.getViewport({scale}).convertToViewportRectangle(rect);
        let top = r[1] - (r[1] - r[3]);
        let left = r[0];
        let height = (r[1] - r[3]);
        let width = (r[2] - r[0]);

        let fieldContext: FieldContext<T> = {
            name,
            top, 
            left, 
            width, 
            height,
            scale,
            offset,
            offsetScale,
            value: onGetValue(getter(item, name) || ''),
            displayValue: format(onGetValue(getter(item, name) || '')),
            error: error || getError(),
            validate,
            onValueChanged: (value: any, event?: any) => {

                this.setState({
                    displayValue: format(value)
                });

                value = onSetValue(value);
                setter(item, name, value);

                if (this.props.onValueChanged !== undefined) {
                    this.props.onValueChanged(value, event);
                }

                if (event !== undefined && event.stopPropagation !== undefined) {
                    event.stopPropagation();
                }

                // deve essere l'ultima chiamata perchè così aggiorno lo stato solo una volta
                if (handleChange !== undefined) {
                    handleChange(item);
                }
            }
        };

        let child = children !== undefined ? children : control !== undefined ? control : null;
        if (typeof child === 'function') {
            child = child(fieldContext);
        }
        
        /*let implementationProps: FieldImplementationProps<T> = {
            fieldContext,
            displayComponent,
            inputComponent
        };

        return props.implementation(implementationProps);*/

        return (
            <FieldContext.Provider value={fieldContext}>
                {child}
            </FieldContext.Provider>
        );
    }
}

export function fieldWithControl<T extends Entity>(props: FieldProps<T>, Component: any) {

    return (
        <FormContext.Consumer>
            {(form: FormContext<T>) => (
                <PageContext.Consumer>
                    {(page: PageContext) => {

                        let p = {...props};
                        p.rect = p.rect || PropertyUtils.valueOrUndefined(page.defs.find(x => x.name === p.name), f => f!.rect);

                        return (
                            <Field 
                                {...p} 
                                form={form}
                                page={page}
                                control={<Component {...props.ControlProps} />}
                            />
                        );
                    }}
                </PageContext.Consumer>
            )}
        </FormContext.Consumer>
    );
}

export interface FieldImplementationProps<T> {
    fieldContext: FieldContext<T>;
    displayComponent: any;
    inputComponent: any;
}

function getter(object: any, fieldName: string) {

    let token = fieldName.split('.');
    let length = token.length;
    
    let property = object;
  
    for (let i = 0; i < length; i++) {
        property = property[token[i]];
    }

    return property;
}

function setter(object: any, fieldName: string, value: any) {

    let token = fieldName.split('.');
    let length = token.length;
    
    let property = object;
  
    let i = 0;
    for (i = 0; i < length - 1; i++) {
        property = property[token[i]];
    }

    property[token[i]] = value;
}