import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useAppointmentRejectActions } from '../../core/appointmentReject';
import { AppointmentReject } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: AppointmentReject[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useAppointmentRejectActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: AppointmentReject, index: number) => {
            actions.itemSelected(item, index);
            navigate('/appointmentReject/' + item.id);
        },
        add: () => {
            let x = AppointmentReject.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: AppointmentReject) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:appointmentReject.index.title')}
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
