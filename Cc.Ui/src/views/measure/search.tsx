import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { MeasureSearchModel } from '../../models';
import { useMeasureActions } from '../../core/measure';

export default (props: any) => {

    const { actions } = useMeasureActions();
    const model = useSelector((root: RootState) => root.measure.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: MeasureSearchModel) => {
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
            <Field.Input model={(x: MeasureSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: MeasureSearchModel) => x.name} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: MeasureSearchModel) => x.deleteUser} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: MeasureSearchModel) => x.deleteDate} />
        </SearchView>
    )
}