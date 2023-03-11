import * as React from 'react';
import { Entity } from '../../../entity';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { ListFieldImplementation, OutlinedFieldImplementation } from '../field';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

export function RadioControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    value: props.value || field.value,
                    onChange: (e: any) => field.onValueChanged(e.target.value, e)
                };

                return (
                    <RadioGroup {...p}>
                        {props.options}
                    </RadioGroup>
                );
            }}
        </FieldContext.Consumer>
    );
}

type RadioProps<T extends Entity> = FieldProps<T> & {
    options?: any;
};

function handleProps<T extends Entity>(props: RadioProps<T>) {

    let p = { ...props };
    p.ControlProps = p.ControlProps || {};
    p.ControlProps.options =  p.ControlProps.options || props.options;
    p.ControlProps.style =  p.ControlProps.style || props.style;
    p.ControlProps.style = {
        ...p.ControlProps.style,
        flexDirection: 'row'
    };

    return p;
}

export function radioOptions<T>(list: T[], value: (item: T) => any, label: (item: T) => any) {
    return list.map((item, index) => <FormControlLabel key={index} value={value(item)} control={<Radio />} label={label(item)} />);
}

export function RadioField<T extends Entity>(props: RadioProps<T>) {

    let p = handleProps(props);
    return fieldWithImplementationControl(p, OutlinedFieldImplementation, RadioControl);
}

export function RadioListField<T extends Entity>(props: RadioProps<T>) {

    let p = handleProps(props);
    return fieldWithImplementationControl(p, ListFieldImplementation, RadioControl);
}