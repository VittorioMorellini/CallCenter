import * as React from 'react';
import { i18n } from '../i18n';
import { Entity, EntityUtils } from '../entity';
import { PropertyUtils, StringUtils } from '../utils';
import { FormContext } from './form';

export interface LabelProps {
    style?: any;
    static?: boolean;
    hidden?: boolean;
    width?: number;
}

export interface FieldProps<T extends Entity> {

    name?: string;
    model?: (x: T) => any;

    className?: any;
    style?: any;
    hidden?: boolean;

    helper?: string;
    required?: boolean;
    disabled?: boolean;

    label?: string;
    LabelProps?: LabelProps;

    ControlProps?: any;
    onGetValue?: (valueFromModel: any) => any;
    onSetValue?: (valueToModel: any) => any;
    // utile per gestire eventuali eventi aggiuntivi (es. Select in cascata)
    onValueChanged?: (value: any, event?: any) => void;

    control?: React.ReactElement<any> | ((context: FieldContext<T>) => React.ReactElement<any>);
    children?: any;
}

export interface FieldContext<T extends Entity> {
    name: string;
    value: any;
    onValueChanged: (value: any, event: any) => any;
    error: boolean;
}

export const FieldContext = React.createContext<FieldContext<any>>({} as any);

type FormFieldProps<T extends Entity> = FieldProps<T> & {
    form: FormContext<T>,
    implementation: any
};

export function Field<T extends Entity>(props: FormFieldProps<T>) {

    const { control, className, helper, hidden, style, disabled } = props;
    const { item, resource, handleChange, labelWidth, validator } = props.form as FormContext<T>;

    if (!item)
        return null;

    if (hidden) {
        return null;
    }

    let onGetValue = props.onGetValue || ((val) => { return val; });
    let onSetValue = props.onSetValue || ((val) => { return val; });

    if (StringUtils.isUndefinedOrEmpty(props.name) && props.model === undefined) {
        throw new Error(`${EntityUtils.resource(item)}: define field name or model!`);
    }

    let name = props.name || PropertyUtils.propertyName<T, keyof T>(props.model!);

    let required = false;
    let error = false;
    let errorMessage = undefined;
    if (validator) {
        // yup
        required = validator.isFieldRequired(name);
        errorMessage = validator.getFieldErrorMessage(name);
        error = errorMessage ? true : false;
    } else {
        // legacy
        let validationError = EntityUtils.fieldErrors(item, name);
        if (validationError !== undefined) {

            error = true;
            let list = [];

            if (validationError.required !== undefined) {
                list.push(i18n.t(validationError.required));
            }

            if (validationError.regex !== undefined) {
                list.push(i18n.t(validationError.regex));
            }

            errorMessage = list.join(', ');            
        }

        required = props.required || EntityUtils.metadata(item)?.fields.get(name)?.required || false;
    }

    let label = props.label || i18n.t(`entities:${resource}.${name}`) || '';
    let labelProps = props.LabelProps || {};
    labelProps.width = labelProps.width || labelWidth;
    labelProps.style = labelProps.style || {
        fontSize: '1em',
        // color: error ? 'red' : 'rgba(0, 0, 0, 0.6)'
    };

    let val = getter(item, name);
    // questo mi serve affinchè l'input sia di tipo 'controlled', se lasciassi undefined avrei un warning a runtime
    if (val === undefined || val === null) {
        val = '';
    }

    let fieldContext: FieldContext<T> = {
        name,
        // value: onGetValue(getter(item, name) || ''),
        value: onGetValue(val),
        onValueChanged: (value: any, event?: any) => {

            value = onSetValue(value);
            setter(item, name, value);

            if (props.onValueChanged !== undefined) {
                props.onValueChanged(value, event);
            }

            if (event !== null && event !== undefined && event.stopPropagation !== undefined) {
                event.stopPropagation();
            }

            // deve essere l'ultima chiamata perchè così aggiorno lo stato solo una volta
            handleChange(item);
        },
        error
    };

    let child = props.children !== undefined ? props.children : control !== undefined ? control : null;
    if (typeof child === 'function') {
        child = child(fieldContext);
    }

    let implementationProps: FieldImplementationProps<T> = {
        className,
        style,
        label,
        LabelProps: labelProps,
        required,
        disabled: disabled || false,
        error,
        errorMessage,
        helper,
        fieldContext,
        child
    };

    return props.implementation(implementationProps);
}

export interface FieldImplementationProps<T extends Entity> {
    className: string;
    style: any;
    label: string;
    LabelProps: LabelProps;
    required: boolean;
    disabled: boolean;
    error: boolean;
    errorMessage?: string;
    helper?: string;
    fieldContext: FieldContext<T>;
    child: any;
}

export function fieldWithImplementationControl<T extends Entity>(props: FieldProps<T>, Implementation: any, Component: any) {

    let p = { ...props };
    p.ControlProps = {}; // al field non interessano le ControlProps

    return (
        <FormContext.Consumer>
            {(form: FormContext<T>) => (
                <Field
                    {...p}
                    form={form}
                    implementation={Implementation}
                    control={<Component {...props.ControlProps} />}
                />
            )}
        </FormContext.Consumer>
    );
}

export function fieldWithImplementation<T extends Entity>(props: FieldProps<T>, Implementation: any) {

    return (
        <FormContext.Consumer>
            {(form: FormContext<T>) => (
                <Field
                    {...props}
                    form={form}
                    implementation={Implementation}
                />
            )}
        </FormContext.Consumer>
    );
}

function getter(object: any, field: string) {

    let token = field.split('.');
    let length = token.length;

    let property = object;

    for (let i = 0; i < length; i++) {
        property = property[token[i]];
    }

    return property;
}

function setter(object: any, field: string, value: any) {

    let token = field.split('.');
    let length = token.length;

    let property = object;

    let i = 0;
    for (i = 0; i < length - 1; i++) {
        property = property[token[i]];
    }

    property[token[i]] = value;
}