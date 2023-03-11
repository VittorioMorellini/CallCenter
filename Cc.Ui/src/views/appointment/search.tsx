import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { AppointmentSearchModel } from '../../models';
import { useAppointmentActions } from '../../core/appointment';

export default (props: any) => {

    const { actions } = useAppointmentActions();
    const model = useSelector((root: RootState) => root.appointment.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: AppointmentSearchModel) => {
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
            <Field.Input model={(x: AppointmentSearchModel) => x.eventId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.appointmentTypeId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.appointmentEndingId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.motivation} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.salesmanId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.customerId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.district} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentSearchModel) => x.productId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: AppointmentSearchModel) => x.dateFrom} />
            <Field.Date model={(x: AppointmentSearchModel) => x.dateTo} />
            <Field.Input model={(x: AppointmentSearchModel) => x.state} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}