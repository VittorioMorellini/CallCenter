import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui';
import { RootState } from '../../app/reducers';
import { Customer } from '../../models';
import { useIdentity } from '../../app/core/hooks';
import { DateUtils } from '../../framework/utils';
import { Check as ConfirmIcon } from '@mui/icons-material';
import { PageLoader } from '../../framework/core/types';
import { CustomerCall } from '../../models/customerCall';
import { useLocalCustomerCallActions } from '../../core/customerCall';
import _ from 'lodash'

type Props = {
    items?: Customer[];
    calls?: CustomerCall[];
    onItemClick: (item: Customer, index: number) => void;
    onItemDelete?: (id: number) => void;
    pageLoader?: PageLoader;
    style?: any;
};

export default ({
    items,
    onItemClick,
    onItemDelete,
    pageLoader,
    style
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.customer.items);
    const { companyId, agencyId } = useIdentity();

    //console.log('customerCalls', customerCalls)
    const sortCalls = (calls: CustomerCall[]) => {
        let myCalls: CustomerCall[] = _.sortBy(calls, x => x.callDate);
        return myCalls.at(myCalls.length - 1).callDate
    }
    return (
        <TableView
            items={rows}
            itemKey={(item: Customer) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}
            rowStyle={(item: Customer, index: number) => item.disabled ? { textDecoration: 'line-through' } : undefined}  
            pageLoader={pageLoader}
            style={style}
            thDefs={<>
                {/* <TableCell>{t('entities:customer.companyId')}</TableCell>
                <TableCell>{t('entities:customer.type')}</TableCell> */}
                {companyId ? <TableCell style={{width: 100}}>{t('entities:customer.companyId')}</TableCell> : null}
                <TableCell>{t('entities:customer.lastName')}</TableCell>
                <TableCell>{t('entities:customer.firstName')}</TableCell>
                <TableCell>{t('entities:customer.address')}</TableCell>
                <TableCell>{t('entities:customer.districtId')}</TableCell>
                <TableCell>{t('entities:customer.region')}</TableCell>
                <TableCell>{t('entities:customer.mobilePhone')}</TableCell>
                <TableCell>{t('entities:customer.productId')}</TableCell>
                <TableCell>{t('entities:customer.state')}</TableCell>
                <TableCell>{t('entities:customer.broadcastingId')}</TableCell>
                <TableCell>{t('entities:customer.lastCall')}</TableCell>
            </>}
            trDefs={(row: Customer) => (<>
                {/* <TableCell>{row.companyId}</TableCell>
                <TableCell>{row.type}</TableCell> */}
                {companyId ? <TableCell>{row.company?.businessName}</TableCell> : null}
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.district?.description}</TableCell>
                <TableCell>{row.district?.tabRegion?.description}</TableCell>
                <TableCell>{row.mobilePhone}</TableCell>
                <TableCell>{row.product?.description}</TableCell>
                <TableCell></TableCell>
                <TableCell>{row.broadcasting?.name}</TableCell>
                <TableCell>{sortCalls(row.customerCall)}</TableCell>
            </>)}
        />
    );
}