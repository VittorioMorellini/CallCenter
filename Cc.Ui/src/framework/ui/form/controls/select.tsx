import * as React from 'react';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { Entity } from '../../../entity';
import { ListFieldImplementation, MaterialFieldImplementation } from '../field';
import { Input, Select, MenuItem } from '@mui/material';
import { MenuItemProps } from '@mui/material/MenuItem';

export function SelectControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    value: props.value || field.value,
                    onChange: (e: any) => field.onValueChanged(e.target.value, e),
                };

                return (
                    <Select {...p} input={<Input />}>
                        {props.blank}
                        {props.options}
                    </Select>
                );
            }}
        </FieldContext.Consumer>
    );
}

type SelectProps<T extends Entity> = FieldProps<T> & {
    blank?: boolean | React.ReactElement<MenuItemProps>;
    options?: any;
};

function handleProps<T extends Entity>(props: SelectProps<T>) {

    let p = { ...props };
    p.ControlProps = p.ControlProps || {};
    p.ControlProps.blank =  p.ControlProps.blank || props.blank;
    p.ControlProps.options =  p.ControlProps.options || props.options;

    if (p.ControlProps.blank === true) {
        p.ControlProps.blank = <MenuItem value="" />;
    }

    return p;
}

export function selectOptions<T>(list: T[], value: (item: T) => any, label: (item: T) => any) {
    return list.map((item, index) => <MenuItem key={index} value={value(item)}>{label(item)}</MenuItem>);
}

export function SelectField<T extends Entity>(props: SelectProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, MaterialFieldImplementation, SelectControl);
}

export function SelectListField<T extends Entity>(props: SelectProps<T>) {

    let p = handleProps(props);
    p.ControlProps.disableUnderline = true;
    p.ControlProps.style = p.ControlProps.style || {};
    p.ControlProps.style.width = p.ControlProps.style.width || '100%';

    return fieldWithImplementationControl(p, ListFieldImplementation, SelectControl);
}