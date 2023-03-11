import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useConfigurationActions } from '../../core/configuration';
import { Configuration } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: Configuration[];
}

function RelatedView ({ idMaster, items }: Props) {

    const history = useNavigate();
    const { t } = useTranslation();
    const { actions } = useConfigurationActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: Configuration, index: number) => {
            actions.itemSelected(item, index);
            history('/configuration/' + item.id);
        },
        add: () => {
            let x = Configuration.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: Configuration) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:configuration.index.title')}
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
