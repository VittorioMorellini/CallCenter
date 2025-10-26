import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { OrderRowSearchModel } from '../../models';
import { useOrderRowActions } from '../../core/orderRow';

export default (props: any) => {

    const { actions } = useOrderRowActions();
    const model = useSelector((root: RootState) => root.orderRow.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: OrderRowSearchModel) => {
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
            <Field.Input model={(x: OrderRowSearchModel) => x.orderId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderRowSearchModel) => x.productId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderRowSearchModel) => x.quantity} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderRowSearchModel) => x.measureId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderRowSearchModel) => x.warehouseId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderRowSearchModel) => x.registrationNumber} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}