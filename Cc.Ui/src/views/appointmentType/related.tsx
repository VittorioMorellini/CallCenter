import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useAppointmentTypeActions } from '../../core/appointmentType';
import { AppointmentType } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: AppointmentType[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useAppointmentTypeActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: AppointmentType, index: number) => {
            actions.itemSelected(item, index);
            navigate('/appointmentType/' + item.id);
        },
        add: () => {
            let x = AppointmentType.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: AppointmentType) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:appointmentType.index.title')}
            actions={<Button.Add onClick={handler.add} buttonVariant="outlined" />}
        >
            <Table 
                items={items} 
                onItemClick={handler.itemClick}
                onItemDelete={handler.delete}
            />
        </Panel>
    );
}

export default RelatedView;
