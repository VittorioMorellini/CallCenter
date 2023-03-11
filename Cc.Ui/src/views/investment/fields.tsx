import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/reducers';
import { useInvestmentTypes, useLookups } from '../../core';
import { Field } from '../../framework/ui/form';
import { autocompleteOptions } from '../../framework/ui/form/controls/autocompleteMultiple';
import { Investment } from '../../models';


export default () => {
    const broadcastings = useSelector((root: RootState) => root.lookup.broadcastings)
    const {products, categories} = useLookups(); //Here because it depends on company
    const investmentTypes = useInvestmentTypes();
    return (
    <>
        <Field.Autocomplete 
            model={(x: Investment) => x.broadcastingId}  
            options={autocompleteOptions(broadcastings, x => x.id, x => x.name)}
        />
        <Field.Date model={(x: Investment) => x.dateFrom} />
        <Field.Date model={(x: Investment) => x.dateTo} />
        <Field.Autocomplete 
            model={(x: Investment) => x.type}  
            options={autocompleteOptions(investmentTypes, x => x.value, x => x.label)}
        />
        <Field.Input model={(x: Investment) => x.amount}  />
        <Field.Input model={(x: Investment) => x.description}  />
        <Field.Autocomplete 
            model={(x: Investment) => x.productId}  
            options={autocompleteOptions(products, x => x.id, x => x.description)}
        />
        <Field.Autocomplete 
            model={(x: Investment) => x.categoryId}  
            options={autocompleteOptions(categories, x => x.id, x => x.description)}
        />
    </>
    )
}
