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
                    value: props.value || field.value || { label: '', value: 0 }, // FIX per far diventare controlled il componente
                    onChange: (e: any, option: AutocompleteOption) => {
                        // TODO: controllare se si perde il precedente valore nel model
                        // facendo una ricerca nell'autocompleter e non confermando la selezione
                        field.onValueChanged(option?.value, e);
                    }
                };

                return (
                    <Autocomplete {...p} 
                        size="small" 
                        error={field.error}
                        getOptionLabel={(options: AutocompleteOption) => options.label}
                        getOptionSelected={(option: any, value: any) => option.value === value.value}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                        // renderOption={(option) => <Typography noWrap={true}>{option}</Typography>}
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
    renderOption?: (option: any) => any
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

    if (p.disabled)
        p.ControlProps.disabled = true;
        
    if (p.renderOption)
        p.ControlProps.renderOption = p.renderOption;

    // è necessario poichè la property value del react-select è in realtà l'intera option ({ value: '<some value>', label: <some label>'})
    p.onGetValue = (value) => p.ControlProps.options.find((x: any) => x.value === value);

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

export function AutocompleteOutlinedField<T extends Entity>(props: AutocompleteProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, AutocompleteControl);
}

export function AutocompleteField<T extends Entity>(props: AutocompleteProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, MaterialFieldImplementation, AutocompleteControl);
}