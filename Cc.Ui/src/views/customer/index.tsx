import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IndexView, Panel } from '../../framework/ui';
import { useCustomerActions } from '../../core/customer';
import { Customer } from '../../models';
import { RootState } from '../../app/reducers';
import Search from './search';
import Table from './table';
import { useIdentity } from '../../app/core/hooks';
import { useCustomerLogic } from '../../core/customer/logic';
import { BrowserHistory } from 'history';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions, logger, pageLoader } = useCustomerActions();
    const isBusy = useSelector((root: RootState) => root.customer.isBusy);
    const model = useSelector((root: RootState) => root.customer.searchModel);
    const { companyId, identity, agencyId } = useIdentity();
    const logic = useCustomerLogic();
    const navigation = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;

    useEffect(() => {
        if (navigation.action !== 'POP') {
            actions.search(model).catch(() => { });
        }
    }, [model]);

    const handler = {
        add: () => {
            if (!companyId) {
                logger.error(t('common:companyMissing'));
                return;
            }
            let item = logic.newCustomer();
            item.companyId = companyId;
            item.agencyId = agencyId;
            item.salesmanId = identity.id;
            handler.itemClick(item, 0);
        },
        itemClick: (item: Customer, index: number) => {
            actions.itemSelected(item, index);
            navigate('/customer/' + item.id);
        }
    }

    const content = (
        <Panel title={t('common:results')}>
            <Table onItemClick={handler.itemClick} pageLoader={pageLoader} />
        </Panel>
    );

    return (
        <IndexView 
            title={t('views:customer.index.title')}
            isBusy={isBusy}
            content={content} 
            search={<Search />}
            onAdd={handler.add}
        />
    );
}