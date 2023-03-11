import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityUtils } from '../../framework/entity';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useLocalReducer } from '../../framework/hooks';
import { useLocalPrincipalActions, principalReducer } from '../../core/principal';
import { Principal } from '../../models';
import Table from  './table';
import Fields from './fields';

type Props = {
    idMaster: number;
    items?: Principal[];
}

function RelatedModalView ({ idMaster, items }: Props) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { actions, state } = useLocalPrincipalActions({ items });
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        add: () => {
            let x = Principal.newItem();
            // x.masterId = idMaster;
            actions.itemSelected(x, 0);
            setIsModalOpen(true);
        },
        save: (item: Principal) => {
            actions.save(item)
                .then(() => { setIsModalOpen(false); })
                .catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        },
        itemClick: (item: Principal, index: number) => {
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
            title={t('views:principal.index.title')}
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
                fields={(props: any) => <Fields item={props.item} setItem={props.setItem} />}
            />
        </Panel>
    );
}

export default RelatedModalView;
