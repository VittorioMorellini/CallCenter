import { useSelect } from '@mui/material/node_modules/@mui/base';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/reducers';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { Warehouse } from '../../models';

export default () => {
    const warehouseTypes = useSelector((root: RootState) => root.lookup.warehouseTypes)

    return (
        <>
            <Field.Input model={(x: Warehouse) => x.description}  />
            <Field.Input model={(x: Warehouse) => x.salesmanId}  />
            <Field.Autocomplete 
                model={(x: Warehouse) => x.warehouseTypeId}  
                options={autocompleteOptions(warehouseTypes, x => x.id, x => x.name)}            
            />
        </>
    )
}