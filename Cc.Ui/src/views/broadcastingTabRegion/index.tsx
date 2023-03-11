import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IndexView, Panel } from '../../framework/ui';
import { useBroadcastingTabRegionActions } from '../../core/broadcastingTabRegion';
import { BroadcastingTabRegion } from '../../models';
import { RootState } from '../../app/reducers';
import Search from './search';
import Table from './table';
import { BrowserHistory } from 'history';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = useBroadcastingTabRegionActions();
    const isBusy = useSelector((root: RootState) => root.broadcastingTabRegion.isBusy);
    const model = useSelector((root: RootState) => root.broadcastingTabRegion.searchModel);
    const navigation = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;

    useEffect(() => {
        if (navigation.action !== 'POP') {
            actions.search(model).catch(() => { });
        }
    }, [model]);

    const handler = {
        add: () => {
            handler.itemClick(BroadcastingTabRegion.newItem(), 0);
        },
        itemClick: (item: BroadcastingTabRegion, index: number) => {
            actions.itemSelected(item, index);
            navigate('/broadcastingTabRegion/' + item.id);
        }
    }

    const content = (
        <Panel title={t('common:results')}>
            <Table onItemClick={handler.itemClick} />
        </Panel>
    );

    return (
        <IndexView 
            title={t('views:broadcastingTabRegion.index.title')}
            isBusy={isBusy}
            content={content} 
            search={<Search />}
            onAdd={handler.add}
        />
    );
}