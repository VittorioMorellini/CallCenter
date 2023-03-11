import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { CustomerCall } from '../../models';
import { DateUtils } from '../../framework/utils';

type Props = {
    items?: CustomerCall[];
    onItemClick: (item: CustomerCall, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.customerCall.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: CustomerCall) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:customerCall.description')}</TableCell>
                {/* <TableCell>{t('entities:customerCall.principalId')}</TableCell> */}
                <TableCell>{t('entities:customerCall.customerId')}</TableCell>
                <TableCell>{t('entities:customerCall.callDate')}</TableCell>
            </>}
            trDefs={(row: CustomerCall) => (<>
                <TableCell>{row.description}</TableCell>
                {/* <TableCell>{row.principalId}</TableCell> */}
                <TableCell>{row.customerId}</TableCell>
                <TableCell>{DateUtils.formatDate(row.callDate)}</TableCell>
            </>)}
        />
    );
}