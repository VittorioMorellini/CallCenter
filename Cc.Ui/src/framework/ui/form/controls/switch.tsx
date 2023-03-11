import * as React from 'react';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { Entity } from '../../../entity';
import { ListFieldImplementation, OutlinedFieldImplementation } from '../field';
import { Switch } from '@mui/material';

function SwitchControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    checked: props.value || field.value || false,
                    onChange: (e: any) => field.onValueChanged(e.target.checked, e)
                };

                return <Switch {...p} />;
            }
        }
        </FieldContext.Consumer>
    );
}

export function SwitchListField<T extends Entity>(props: FieldProps<T>) {

    return fieldWithImplementationControl(props, ListFieldImplementation, SwitchControl);
}

export function SwitchField<T extends Entity>(props: FieldProps<T>) {

    return fieldWithImplementationControl(props, OutlinedFieldImplementation, SwitchControl);
}

