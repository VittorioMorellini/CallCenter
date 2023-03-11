import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { InvestmentSearchModel } from '../../models';
import { useInvestmentActions } from '../../core/investment';

export default (props: any) => {

    const { actions } = useInvestmentActions();
    const model = useSelector((root: RootState) => root.investment.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: InvestmentSearchModel) => {
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
            <Field.Input model={(x: InvestmentSearchModel) => x.broadcastingId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: InvestmentSearchModel) => x.dateFrom} />
            <Field.Date model={(x: InvestmentSearchModel) => x.dateTo} />
            <Field.Input model={(x: InvestmentSearchModel) => x.type} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: InvestmentSearchModel) => x.amount} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: InvestmentSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: InvestmentSearchModel) => x.productId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: InvestmentSearchModel) => x.deleteUser} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: InvestmentSearchModel) => x.deleteDate} />
        </SearchView>
    )
}