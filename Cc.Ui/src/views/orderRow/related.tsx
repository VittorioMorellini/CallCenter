import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useOrderRowActions } from '../../core/orderRow';
import { OrderRow } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: OrderRow[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useOrderRowActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: OrderRow, index: number) => {
            actions.itemSelected(item, index);
            navigate('/orderRow/' + item.id);
        },
        add: () => {
            let x = OrderRow.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: OrderRow) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:orderRow.index.title')}
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
