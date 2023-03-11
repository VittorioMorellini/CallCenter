import React from 'react';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { BroadcastingProduct, Product } from '../../models';

interface Props {
    products?: Product[];
}
export default ({products}: Props) => {

    return (
        <>
            {/* <Field.Input model={(x: BroadcastingProduct) => x.broadcastingId}  /> */}
            <Field.Autocomplete 
                    model={(x: BroadcastingProduct) => x.productId}
                    options={autocompleteOptions(products, x => x.id, x => x.description)}
                />
        </>
    )
}