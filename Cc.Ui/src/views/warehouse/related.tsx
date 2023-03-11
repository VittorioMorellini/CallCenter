import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useWarehouseActions } from '../../core/warehouse';
import { Warehouse } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: Warehouse[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useWarehouseActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: Warehouse, index: number) => {
            actions.itemSelected(item, index);
            navigate('/warehouse/' + item.id);
        },
        add: () => {
            let x = Warehouse.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: Warehouse) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:warehouse.index.title')}
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
