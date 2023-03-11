import React from 'react';
import { Entity } from '../../../entity';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { MaterialFieldImplementation, OutlinedFieldImplementation } from '../field';
import { Autocomplete } from '@mui/lab';
import { TextField } from '@mui/material';

function AutocompleteControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let p = {
                    ...props,
                    name: props.name || field.name,
                    value: props.value || field.value || [],
                    onChange: (e: any, option: AutocompleteOption) => {
                        field.onValueChanged(option, e);
                    }
                };

                return (
                    <Autocomplete {...p} 
                        size="small" 
                        multiple={true}
                        error={field.error}
                        getOptionLabel={(options: AutocompleteOption) => options.label}
                        // getOptionSelected={(option: any, value: any) => option.value === value.value}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                );
            }}
        </FieldContext.Consumer>
    );
}

type AutocompleteProps<T extends Entity> = FieldProps<T> & {    
    blank?: any;
    options: any;
    readonly?: boolean;
    renderOption?: (option: any) => any;
    isArrayField: boolean;
};

type AutocompleteOption =  {
    value: any;
    label: string;
}

function handleProps<T extends Entity>(props: AutocompleteProps<T>) {

    let p = { ...props };
    p.ControlProps = p.ControlProps || {};
    p.ControlProps.blank = p.ControlProps.blank || props.blank;
    p.ControlProps.options = p.ControlProps.options || props.options || [];

    if (p.ControlProps.blank === true) {
        p.ControlProps.blank = { value: '', label: '' };
    }
    if (p.ControlProps.blank !== undefined && p.ControlProps.blank !== false) {
        p.ControlProps.options.unshift(p.ControlProps.blank);
    }

    p.ControlProps.style = p.ControlProps.style || {};
    p.ControlProps.style = {
        ...p.ControlProps.style,
        width: p.ControlProps.style.width || '100%'
    };

    if (p.renderOption)
        p.ControlProps.renderOption = p.renderOption;

    p.onGetValue = (list) => {
        list = list ? list : []
        list = Array.isArray(list) ? list : JSON.parse(list);
        return p.ControlProps.options.filter((x: AutocompleteOption) => list.find((y: any) => y === x.value) !== undefined);
    }
    p.onSetValue = (options) => {
        let list = options.map((x: AutocompleteOption) => x.value);
        return p.isArrayField ? list : JSON.stringify(list);
    }

    return p;
}

export function autocompleteOptions<T>(list: T[], value: (item: T) => any, label: (item: T) => any): AutocompleteOption[] {
    return list.map((item) => { 
        return { 
            value: value(item), 
            label: label(item)
        };
    });
}

export function AutocompleteMultipleOutlinedField<T extends Entity>(props: AutocompleteProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, AutocompleteControl);
}

export function AutocompleteMultipleField<T extends Entity>(props: AutocompleteProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, MaterialFieldImplementation, AutocompleteControl);
}