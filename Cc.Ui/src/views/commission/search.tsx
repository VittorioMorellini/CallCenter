import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { CommissionSearchModel } from '../../models';
import { useCommissionActions } from '../../core/commission';

export default (props: any) => {

    const { actions } = useCommissionActions();
    const model = useSelector((root: RootState) => root.commission.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: CommissionSearchModel) => {
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
            <Field.Input model={(x: CommissionSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CommissionSearchModel) => x.percentage} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}