import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityUtils } from '../../framework/entity';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useLocalOrderTableActions, orderTableReducer } from '../../core/orderTable';
import { OrderTable } from '../../models';
import Table from  './table';
import Fields from './fields';

type Props = {
    idMaster: number;
    items?: OrderTable[];
}

function RelatedModalView ({ idMaster, items }: Props) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { actions, state } = useLocalOrderTableActions({ items });
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        add: () => {
            let x = OrderTable.newItem();
            // x.masterId = idMaster;
            actions.itemSelected(x, 0);
            setIsModalOpen(true);
        },
        save: (item: OrderTable) => {
            actions.save(item)
                .then(() => { setIsModalOpen(false); })
                .catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        },
        itemClick: (item: OrderTable, index: number) => {
            actions.itemSelected(item, 0)
            setIsModalOpen(true);
        },
        cancel: () => {
            EntityUtils.rollback(state.currentItem!);
            setIsModalOpen(false);
        }
    };

    return (
        <Panel 
            title={t('views:orderTable.index.title')}
            actions={<Button.Add onClick={handler.add} buttonVariant="outlined" />}
        >
            <Table 
                items={state.items} 
                onItemClick={handler.itemClick}
                onItemDelete={handler.delete}
            />
            <ModalView
                open={isModalOpen}
                currentItem={state.currentItem!}
                onCancel={handler.cancel}
                onConfirm={handler.save}
                fields={<Fields />}
            />
        </Panel>
    );
}

export default RelatedModalView;
