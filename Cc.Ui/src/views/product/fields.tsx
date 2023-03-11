import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/reducers';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { Product } from '../../models';

export default () => {
    const categories = useSelector((state: RootState) => state.lookup.categories)
    const companies = useSelector((state: RootState) => state.lookup.companies)
    
    return (
    <>
        <Field.Input model={(x: Product) => x.description}  />
        <Field.Input model={(x: Product) => x.price}  />
        <Field.Input model={(x: Product) => x.code}  />
        <Field.Autocomplete 
            model={(x: Product) => x.companyId}  
            options={autocompleteOptions(companies, x => x.id, x => x.businessName)}            
        />
        <Field.Autocomplete 
            model={(x: Product) => x.categoryId}  
            options={autocompleteOptions(categories, x => x.id, x => x.description)}            
        />
    </>
    )
}

