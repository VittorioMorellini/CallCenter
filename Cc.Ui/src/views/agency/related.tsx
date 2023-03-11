import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useAgencyActions } from '../../core/agency';
import { Agency } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: Agency[];
}

function RelatedView ({ idMaster, items }: Props) {

    const history = useNavigate();
    const { t } = useTranslation();
    const { actions } = useAgencyActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: Agency, index: number) => {
            actions.itemSelected(item, index);
            history('/agency/' + item.id);
        },
        add: () => {
            let x = Agency.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: Agency) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:agency.index.title')}
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
