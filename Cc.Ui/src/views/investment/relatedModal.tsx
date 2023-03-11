import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityUtils } from '../../framework/entity';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useLocalInvestmentActions, investmentReducer } from '../../core/investment';
import { Investment } from '../../models';
import Table from  './table';
import Fields from './fields';

type Props = {
    idMaster: number;
    items?: Investment[];
}

function RelatedModalView ({ idMaster, items }: Props) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { actions, state } = useLocalInvestmentActions({ items });
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        add: () => {
            let x = Investment.newItem();
            // x.masterId = idMaster;
            actions.itemSelected(x, 0);
            setIsModalOpen(true);
        },
        save: (item: Investment) => {
            actions.save(item)
                .then(() => { setIsModalOpen(false); })
                .catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        },
        itemClick: (item: Investment, index: number) => {
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
            title={t('views:investment.index.title')}
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
