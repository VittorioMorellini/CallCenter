import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { BroadcastingTabRegionSearchModel } from '../../models';
import { useBroadcastingTabRegionActions } from '../../core/broadcastingTabRegion';

export default (props: any) => {

    const { actions } = useBroadcastingTabRegionActions();
    const model = useSelector((root: RootState) => root.broadcastingTabRegion.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: BroadcastingTabRegionSearchModel) => {
            return actions.search(x).catch(() => { });
        },
        keyPress: (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handler.search(item)
            }
        }
    }

    return (
        <SearchView 
            item={item} 
            setItem={setItem}
            onSearch={handler.search}
        >
            <Field.Input model={(x: BroadcastingTabRegionSearchModel) => x.broadcastingId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: BroadcastingTabRegionSearchModel) => x.tabRegionId} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}