import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { AppointmentTypeSearchModel } from '../../models';
import { useAppointmentTypeActions } from '../../core/appointmentType';

export default (props: any) => {

    const { actions } = useAppointmentTypeActions();
    const model = useSelector((root: RootState) => root.appointmentType.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: AppointmentTypeSearchModel) => {
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
            <Field.Input model={(x: AppointmentTypeSearchModel) => x.type} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentTypeSearchModel) => x.page} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AppointmentTypeSearchModel) => x.role} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}