import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { EventTypeSearchModel } from '../../models';
import { useEventTypeActions } from '../../core/eventType';

export default (props: any) => {

    const { actions } = useEventTypeActions();
    const model = useSelector((root: RootState) => root.eventType.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: EventTypeSearchModel) => {
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
            <Field.Input model={(x: EventTypeSearchModel) => x.name} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: EventTypeSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}