import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Investment } from '../../models';
import { DateUtils } from '../../framework/utils';

type Props = {
    items?: Investment[];
    onItemClick: (item: Investment, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.investment.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Investment) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:investment.broadcastingId')}</TableCell>
                <TableCell>{t('entities:investment.dateFrom')}</TableCell>
                <TableCell>{t('entities:investment.dateTo')}</TableCell>
                <TableCell>{t('entities:investment.type')}</TableCell>
                <TableCell>{t('entities:investment.amount')}</TableCell>
                <TableCell>{t('entities:investment.description')}</TableCell>
                <TableCell>{t('entities:investment.productId')}</TableCell>
                <TableCell>{t('entities:investment.categoryId')}</TableCell>
            </>}
            trDefs={(row: Investment) => (<>
                <TableCell>{row.broadcasting?.name}</TableCell>
                <TableCell>{DateUtils.formatDate(row.dateFrom)}</TableCell>
                <TableCell>{DateUtils.formatDate(row.dateTo)}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.product?.description}</TableCell>
                <TableCell>{row.category?.description}</TableCell>
                {/* <TableCell>{row.deleteUser}</TableCell>
                <TableCell>{row.deleteDate}</TableCell> */}
            </>)}
        />
    );
}