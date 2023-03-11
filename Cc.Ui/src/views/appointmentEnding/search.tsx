import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { AppointmentEndingSearchModel } from '../../models';
import { useAppointmentEndingActions } from '../../core/appointmentEnding';

export default (props: any) => {

    const { actions } = useAppointmentEndingActions();
    const model = useSelector((root: RootState) => root.appointmentEnding.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: AppointmentEndingSearchModel) => {
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
            <Field.Input model={(x: AppointmentEndingSearchModel) => x.outcome} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentEndingSearchModel) => x.color} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}