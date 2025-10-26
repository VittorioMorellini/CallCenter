import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { OrderTableSearchModel } from '../../models';
import { useOrderTableActions } from '../../core/orderTable';

export default (props: any) => {

    const { actions } = useOrderTableActions();
    const model = useSelector((root: RootState) => root.orderTable.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: OrderTableSearchModel) => {
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
            <Field.Input model={(x: OrderTableSearchModel) => x.appointmentId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.totalAmount} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.vatId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.netAmount} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.commissionId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.commissionAmount} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.orderStateId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.notes} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.date} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.invoiceDate} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.invoiceNumber} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.taxcode} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.accountholder} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.vatcode} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.deposit} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: OrderTableSearchModel) => x.balance} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}