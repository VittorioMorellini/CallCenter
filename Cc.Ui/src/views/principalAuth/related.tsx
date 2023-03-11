import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button } from '../../framework/ui';
import { usePrincipalAuthActions } from '../../core/principalAuth';
import { PrincipalAuth } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: PrincipalAuth[];
}

function RelatedView ({ idMaster, items }: Props) {

    const history = useNavigate();
    const { t } = useTranslation();
    const { actions } = usePrincipalAuthActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: PrincipalAuth, index: number) => {
            actions.itemSelected(item, index);
            history('/principalAuth/' + item.id);
        },
        add: () => {
            let x = PrincipalAuth.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: PrincipalAuth) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:principalAuth.index.title')}
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
