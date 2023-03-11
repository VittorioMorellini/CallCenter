import * as React from 'react';
import { Entity } from '../../../entity';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { ListFieldImplementation, OutlinedFieldImplementation } from '../field';
import { Checkbox } from '@mui/material';

export function CheckboxControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    checked: props.value || field.value,
                    onChange: (e: any) => field.onValueChanged(e.target.checked, e)
                };

                return <Checkbox {...p} />;
            }
        }
        </FieldContext.Consumer>
    );
}

export function CheckboxListField<T extends Entity>(props: FieldProps<T>) {
    
    return fieldWithImplementationControl(props, ListFieldImplementation, CheckboxControl);
}

export function CheckboxField<T extends Entity>(props: FieldProps<T>) {
    
    return fieldWithImplementationControl(props, OutlinedFieldImplementation, CheckboxControl);
}