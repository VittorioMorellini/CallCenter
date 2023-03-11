import React from 'react';
import { Entity } from '../../../entity';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { ListFieldImplementation, MaterialFieldImplementation, OutlinedFieldImplementation } from '../field';
import { Input, OutlinedInput } from '@mui/material';

export function InputControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    value: props.value || field.value,
                    onChange: (e: any) => field.onValueChanged(e.target.value, e)
                };

                // return <Input {...p} />;
                return <OutlinedInput {...p} margin="dense" error={field.error} size="small" />
            }}
        </FieldContext.Consumer>
    );
}

function InputOutlinedControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    value: props.value || field.value,
                    onChange: (e: any) => field.onValueChanged(e.target.value, e)
                };

                return <OutlinedInput {...p} margin="dense" error={field.error} size="small" />;
            }}
        </FieldContext.Consumer>
    );
}

type InputProps<T extends Entity> = FieldProps<T> & {
    type?: 'number' | 'text' | 'password'; 
};

function handleProps<T extends Entity>(props: InputProps<T>) {

    let p = { ...props };
    p.ControlProps = p.ControlProps || {};
    p.ControlProps.type = p.ControlProps.type || p.type || 'text';
    p.ControlProps.style = p.ControlProps.style || {};
    p.ControlProps.style = {
        ...p.ControlProps.style,
        width: p.ControlProps.style.width || '100%'
    };
    p.ControlProps.autoComplete = 'chrome-off';

    return p;
}

export function InputField<T extends Entity>(props: InputProps<T>) {

    let p = handleProps(props);
    return fieldWithImplementationControl(p, MaterialFieldImplementation, InputControl);
}

export function InputListField<T extends Entity>(props: InputProps<T>) {

    let p = handleProps(props);
    p.ControlProps.disableUnderline = true;    

    return fieldWithImplementationControl(p, ListFieldImplementation, InputControl);
}

export function InputOutlinedField<T extends Entity>(props: InputProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, InputOutlinedControl);
}