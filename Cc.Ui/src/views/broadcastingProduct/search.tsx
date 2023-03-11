import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { BroadcastingProductSearchModel } from '../../models';
import { useBroadcastingProductActions } from '../../core/broadcastingProduct';

export default (props: any) => {

    const { actions } = useBroadcastingProductActions();
    const model = useSelector((root: RootState) => root.broadcastingProduct.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: BroadcastingProductSearchModel) => {
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
            <Field.Input model={(x: BroadcastingProductSearchModel) => x.broadcastingId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: BroadcastingProductSearchModel) => x.productId} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}