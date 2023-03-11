import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { CustomerCallSearchModel } from '../../models';
import { useCustomerCallActions } from '../../core/customerCall';

export default (props: any) => {

    const { actions } = useCustomerCallActions();
    const model = useSelector((root: RootState) => root.customerCall.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: CustomerCallSearchModel) => {
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
            <Field.Input model={(x: CustomerCallSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CustomerCallSearchModel) => x.principalId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CustomerCallSearchModel) => x.customerId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: CustomerCallSearchModel) => x.callDate} />
        </SearchView>
    )
}