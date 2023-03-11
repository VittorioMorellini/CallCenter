import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityUtils } from '../../framework/entity';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useLocalPrincipalAuthActions } from '../../core/principalAuth';
import { Agency, Product, PrincipalAuth, Category } from '../../models';
import Table from  './table';
import Fields from './fields';
import { ListUtils } from '../../framework/utils';
import _ from 'lodash';

type Props = {
    idMaster: number;
    items?: PrincipalAuth[];
    agencies: Agency[];
    products: Product[];
    categories: Category[];
}

function RelatedModalView ({ idMaster, items, agencies, products, categories }: Props) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { actions, state } = useLocalPrincipalAuthActions({ items });
    
    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        add: () => {
            let x = PrincipalAuth.newItem();
            x.principalId = idMaster;
            actions.itemSelected(x, 0);
            setIsModalOpen(true);
        },
        save: (item: PrincipalAuth) => {
            actions.save(item)
                .then(() => { setIsModalOpen(false); })
                .catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        },
        itemClick: (item: PrincipalAuth, index: number) => {
            actions.itemSelected(item, 0)
            setIsModalOpen(true);
        },
        cancel: () => {
            EntityUtils.rollback(state.currentItem!);
            setIsModalOpen(false);
        }
    };

    const getComplementAgencies = () => {

        if (agencies.length === 0)
            return [];

        return ListUtils.getComplement(
            agencies, 
            _.flatMap(state.items.filter(x => x.agencyId && x.agency !== undefined), x => x.agency),
             x => x.id,
             state.currentItem?.agency
        );
    }

    const getComplementProducts = () => {

        if (products.length === 0)
            return [];

        return ListUtils.getComplement(
            products, 
            _.flatMap(state.items.filter(x => x.productId && x.product !== undefined), x => x.product),
             x => x.id,
             state.currentItem?.product
        );
    }

    const getComplementCategories = () => {

        if (categories.length === 0)
            return [];

        return ListUtils.getComplement(
            categories, 
            _.flatMap(state.items.filter(x => x.categoryId && x.category !== undefined), x => x.category),
             x => x.id,
             state.currentItem?.category
        );
    }
    
    return (
        <Panel 
            title={t('views:principalAuth.index.title')}
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
                fields={<Fields agencies={getComplementAgencies()} products={getComplementProducts()} categories={getComplementCategories()} />}
            />
        </Panel>
    );
}

export default RelatedModalView;
