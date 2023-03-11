import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { BroadcastingSearchModel } from '../../models';
import { useBroadcastingActions } from '../../core/broadcasting';

export default (props: any) => {

    const { actions } = useBroadcastingActions();
    const model = useSelector((root: RootState) => root.broadcasting.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: BroadcastingSearchModel) => {
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
            <Field.Input model={(x: BroadcastingSearchModel) => x.name} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: BroadcastingSearchModel) => x.type} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: BroadcastingSearchModel) => x.authorityName} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: BroadcastingSearchModel) => x.authorityData} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: BroadcastingSearchModel) => x.notes} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}