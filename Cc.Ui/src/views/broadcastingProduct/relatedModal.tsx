import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityUtils } from '../../framework/entity';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useLocalBroadcastingProductActions, broadcastingProductReducer } from '../../core/broadcastingProduct';
import { BroadcastingProduct, Product } from '../../models';
import Table from  './table';
import Fields from './fields';

type Props = {
    idMaster: number;
    items?: BroadcastingProduct[];
    products: Product[];
}

function RelatedModalView ({ idMaster, items, products }: Props) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { actions, state } = useLocalBroadcastingProductActions({ items });
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        add: () => {
            let x = BroadcastingProduct.newItem();
            x.broadcastingId = idMaster;
            actions.itemSelected(x, 0);
            setIsModalOpen(true);
        },
        save: (item: BroadcastingProduct) => {
            actions.save(item)
                .then(() => { setIsModalOpen(false); })
                .catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        },
        itemClick: (item: BroadcastingProduct, index: number) => {
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
            title={t('views:broadcastingProduct.index.title')}
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
                fields={<Fields products={products}/>}
            />
        </Panel>
    );
}

export default RelatedModalView;
