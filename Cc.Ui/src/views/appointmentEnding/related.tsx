import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useAppointmentEndingActions } from '../../core/appointmentEnding';
import { AppointmentEnding } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: AppointmentEnding[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useAppointmentEndingActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: AppointmentEnding, index: number) => {
            actions.itemSelected(item, index);
            navigate('/appointmentEnding/' + item.id);
        },
        add: () => {
            let x = AppointmentEnding.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: AppointmentEnding) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:appointmentEnding.index.title')}
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
