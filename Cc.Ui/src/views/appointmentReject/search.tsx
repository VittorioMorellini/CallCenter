import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { AppointmentRejectSearchModel } from '../../models';
import { useAppointmentRejectActions } from '../../core/appointmentReject';

export default (props: any) => {

    const { actions } = useAppointmentRejectActions();
    const model = useSelector((root: RootState) => root.appointmentReject.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: AppointmentRejectSearchModel) => {
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
            <Field.Input model={(x: AppointmentRejectSearchModel) => x.reject} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}