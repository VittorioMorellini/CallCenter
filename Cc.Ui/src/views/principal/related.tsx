import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { usePrincipalActions } from '../../core/principal';
import { Principal } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: Principal[];
}

function RelatedView ({ idMaster, items }: Props) {

    const history = useNavigate();
    const { t } = useTranslation();
    const { actions } = usePrincipalActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: Principal, index: number) => {
            actions.itemSelected(item, index);
            history('/principal/' + item.id);
        },
        add: () => {
            let x = Principal.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: Principal) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:principal.index.title')}
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
