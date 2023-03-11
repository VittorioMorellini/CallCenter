import React from 'react';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { BroadcastingTabRegion, TabRegion } from '../../models';

interface Props {
    regions: TabRegion[]
}

export default ({regions}: Props) => (
    <>
        {/* <Field.Input model={(x: BroadcastingTabRegion) => x.broadcastingId}  /> */}
        <Field.Autocomplete 
                    model={(x: BroadcastingTabRegion) => x.tabRegionId}
                    options={autocompleteOptions(regions, x => x.id, x => x.description)}
                />
    </>
)