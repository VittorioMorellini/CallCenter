import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { OrderTable } from '../../models';

type Props = {
    items?: OrderTable[];
    onItemClick: (item: OrderTable, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.orderTable.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: OrderTable) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:orderTable.appointmentId')}</TableCell>
                <TableCell>{t('entities:orderTable.totalAmount')}</TableCell>
                <TableCell>{t('entities:orderTable.vatId')}</TableCell>
                <TableCell>{t('entities:orderTable.netAmount')}</TableCell>
                <TableCell>{t('entities:orderTable.commissionId')}</TableCell>
                <TableCell>{t('entities:orderTable.commissionAmount')}</TableCell>
                <TableCell>{t('entities:orderTable.orderStateId')}</TableCell>
                <TableCell>{t('entities:orderTable.notes')}</TableCell>
                <TableCell>{t('entities:orderTable.date')}</TableCell>
                <TableCell>{t('entities:orderTable.invoiceDate')}</TableCell>
                <TableCell>{t('entities:orderTable.invoiceNumber')}</TableCell>
                <TableCell>{t('entities:orderTable.taxcode')}</TableCell>
                <TableCell>{t('entities:orderTable.accountholder')}</TableCell>
                <TableCell>{t('entities:orderTable.vatcode')}</TableCell>
                <TableCell>{t('entities:orderTable.deposit')}</TableCell>
                <TableCell>{t('entities:orderTable.balance')}</TableCell>
            </>}
            trDefs={(row: OrderTable) => (<>
                <TableCell>{row.appointmentId}</TableCell>
                <TableCell>{row.totalAmount}</TableCell>
                <TableCell>{row.vatId}</TableCell>
                <TableCell>{row.netAmount}</TableCell>
                <TableCell>{row.commissionId}</TableCell>
                <TableCell>{row.commissionAmount}</TableCell>
                <TableCell>{row.orderStateId}</TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.invoiceDate}</TableCell>
                <TableCell>{row.invoiceNumber}</TableCell>
                <TableCell>{row.taxcode}</TableCell>
                <TableCell>{row.accountholder}</TableCell>
                <TableCell>{row.vatcode}</TableCell>
                <TableCell>{row.deposit}</TableCell>
                <TableCell>{row.balance}</TableCell>
            </>)}
        />
    );
}