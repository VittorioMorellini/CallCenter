import React from 'react';
import { Field } from '../../framework/ui/form';
import { autocompleteOptions } from '../../framework/ui/form/controls/autocomplete';
import { Agency, Product, PrincipalAuth, Category } from '../../models';

type Props = {
    agencies?: Agency[];
    products?: Product[];
    categories?: Category[];
}

const Fields = ({ agencies, products, categories }: Props) => {

    // HACK: solo per evitare che vada in errore di compilazione il detail di PrincipalAuth
    agencies = agencies ?? [];
    products = products ?? [];

    return (
        <>
            <Field.Autocomplete 
                model={(x: PrincipalAuth) => x.agencyId}
                options={autocompleteOptions(agencies, x => x.id, x => x.name)}
            />
            <Field.Autocomplete 
                model={(x: PrincipalAuth) => x.productId}
                options={autocompleteOptions(products, x => x.id, x => x.description)}
            />
            <Field.Autocomplete 
                model={(x: PrincipalAuth) => x.categoryId}
                options={autocompleteOptions(categories, x => x.id, x => x.description)}
            />
        </>
    )
}

export default Fields;