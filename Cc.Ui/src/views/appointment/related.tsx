import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useAppointmentActions } from '../../core/appointment';
import { Appointment } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: Appointment[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useAppointmentActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: Appointment, index: number) => {
            actions.itemSelected(item, index);
            navigate('/appointment/' + item.id);
        },
        add: () => {
            let x = Appointment.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: Appointment) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:appointment.index.title')}
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
