import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityUtils } from '../../framework/entity';
import { Panel, Button, ModalView } from '../../framework/ui';
import { useLocalPrincipalTabRegionActions, principalTabRegionReducer } from '../../core/principalTabRegion';
import { PrincipalTabRegion, TabRegion } from '../../models';
import Table from  './table';
import Fields from './fields';
import { ListUtils } from '../../framework/utils';
import _ from 'lodash';

type Props = {
    idMaster: number;
    items?: PrincipalTabRegion[];
    regions?: TabRegion[];
}

function RelatedModalView ({ idMaster, items, regions }: Props) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { actions, state } = useLocalPrincipalTabRegionActions({ items });

    useEffect(() => {
        if (items && items.length > 0)
            actions.setItems(items);
    }, [items]);

    const handler = {
        add: () => {
            let x = PrincipalTabRegion.newItem();
            x.principalId = idMaster;
            actions.itemSelected(x, 0);
            setIsModalOpen(true);
        },
        save: (item: PrincipalTabRegion) => {
            actions.save(item)
                .then(() => { setIsModalOpen(false); })
                .catch(() => { });
        },
        delete: (id: number) => {
            actions.delete(id).catch(() => { });
        },
        itemClick: (item: PrincipalTabRegion, index: number) => {
            actions.itemSelected(item, 0)
            setIsModalOpen(true);
        },
        cancel: () => {
            EntityUtils.rollback(state.currentItem!);
            setIsModalOpen(false);
        }
    };

    //Error to understand if I use complementRegions....: id of undefined
    const getComplementRegions = () => {
        if (regions === null || regions === undefined || regions.length === 0)
            return [];

        return ListUtils.getComplement(
            regions, 
            _.flatMap(state.items.filter(x => x.tabRegionId && x.tabRegion !== undefined), x => x.tabRegion),
             x => x.id,
             state.currentItem?.tabRegion
        );
    }
    
    return (
        <Panel 
            title={t('views:principalTabRegion.index.title')}
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
                fields={<Fields regions={getComplementRegions()}/>}
            />
        </Panel>
    );
}

export default RelatedModalView;
