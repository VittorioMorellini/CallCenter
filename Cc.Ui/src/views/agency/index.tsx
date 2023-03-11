import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IndexView, Panel } from '../../framework/ui';
import { useAgencyActions } from '../../core/agency';
import { Agency, AgencySearchModel } from '../../models';
import { RootState } from '../../app/reducers';
import Search from './search';
import Table from './table';
import { useIdentity } from '../../app/core/hooks';
import { BrowserHistory } from 'history';

export default (props: any) => {

    const history = useNavigate();
    const { t } = useTranslation();
    const { actions } = useAgencyActions();
    const isBusy = useSelector((root: RootState) => root.agency.isBusy);
    const model = useSelector((root: RootState) => root.agency.searchModel) as AgencySearchModel;
    const { companyId, isAdmin, agencyId } = useIdentity();
    const navigation = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;

    useEffect(() => {
        if (navigation.action !== 'POP') {
            if (!isAdmin && agencyId !== 0 && agencyId !== null)
                model.agencyId = agencyId;
            actions.search(model).catch(() => { });
        }
    }, [model]);

    const handler = {
        add: () => {
            let x = Agency.newItem();
            x.companyId = companyId;
            handler.itemClick(x, 0);
        },
        itemClick: (item: Agency, index: number) => {
            actions.itemSelected(item, index);
            history('/agency/' + item.id);
        }
    }

    const content = (
        <Panel title={t('common:results')}>
            <Table onItemClick={handler.itemClick} />
        </Panel>
    );

    return (
        <IndexView 
            title={t('views:agency.index.title')}
            isBusy={isBusy}
            content={content} 
            search={<Search />}
            onAdd={handler.add}
        />
    );
}