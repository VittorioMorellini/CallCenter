import React from 'react';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { PrincipalTabRegion, TabRegion } from '../../models';

type Props = {
    regions?: TabRegion[];
}

export default ({regions}: Props) => (
    <>
        {/* <Field.Input model={(x: PrincipalTabRegion) => x.principalId}  /> */}
        <Field.Autocomplete 
                model={(x: PrincipalTabRegion) => x.tabRegionId}
                options={autocompleteOptions(regions, x => x.id, x => x.description)}
            />
    </>
)