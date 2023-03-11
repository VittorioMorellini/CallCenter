import React from 'react';
import { useBroadcastingTypes } from '../../core';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { Broadcasting } from '../../models';

export default () => {

    const types = useBroadcastingTypes();
    return (
        <>
            <Field.Input model={(x: Broadcasting) => x.name}  />
            <Field.Autocomplete 
                    model={(x: Broadcasting) => x.type } 
                    options={autocompleteOptions(types, x => x.value, x => x.label)}
                />
            <Field.Input model={(x: Broadcasting) => x.authorityName}  />
            <Field.Input model={(x: Broadcasting) => x.authorityData}  />
            <Field.Input 
                model={(x: Broadcasting) => x.notes}  
                ControlProps={{multiline: true, rows: 5}}
            />
        </>
    )
}