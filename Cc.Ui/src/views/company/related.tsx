import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useCompanyActions } from '../../core/company';
import { Company } from '../../models';
import Table from  './table';

type Props = {
    idMaster: number;
    items?: Company[];
}

function RelatedView ({ idMaster, items }: Props) {

    const history = useNavigate();
    const { t } = useTranslation();
    const { actions } = useCompanyActions();
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        itemClick: (item: Company, index: number) => {
            actions.itemSelected(item, index);
            history('/company/' + item.id);
        },
        add: () => {
            let x = Company.newItem();
            // x.masterId = idMaster;
            handler.itemClick(x, 0);
        },
        save: (item: Company) => {
            actions.save(item).catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        }
    };

    return (
        <Panel 
            title={t('views:company.index.title')}
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
