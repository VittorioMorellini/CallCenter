import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useOrderTableActions } from '../../core/orderTable';
import { OrderTable } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: OrderTable[];
}

function RelatedView ({ idMaster, items }: Props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useOrderTableActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: OrderTable, index: number) => {
            actions.itemSelected(item, index);
            navigate('/orderTable/' + item.id);
        },
        add: () => {
            let x = OrderTable.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: OrderTable) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:orderTable.index.title')}
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
