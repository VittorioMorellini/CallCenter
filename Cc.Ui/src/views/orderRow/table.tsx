import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { OrderRow } from '../../models';

type Props = {
    items?: OrderRow[];
    onItemClick: (item: OrderRow, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.orderRow.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: OrderRow) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:orderRow.orderId')}</TableCell>
                <TableCell>{t('entities:orderRow.productId')}</TableCell>
                <TableCell>{t('entities:orderRow.quantity')}</TableCell>
                <TableCell>{t('entities:orderRow.measureId')}</TableCell>
                <TableCell>{t('entities:orderRow.warehouseId')}</TableCell>
                <TableCell>{t('entities:orderRow.registrationNumber')}</TableCell>
            </>}
            trDefs={(row: OrderRow) => (<>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.productId}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.measureId}</TableCell>
                <TableCell>{row.warehouseId}</TableCell>
                <TableCell>{row.registrationNumber}</TableCell>
            </>)}
        />
    );
}