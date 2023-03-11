import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Product } from '../../models';

type Props = {
    items?: Product[];
    onItemClick: (item: Product, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.product.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Product) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:product.description')}</TableCell>
                <TableCell>{t('entities:product.price')}</TableCell>
                <TableCell>{t('entities:product.code')}</TableCell>
                <TableCell>{t('entities:product.companyId')}</TableCell>
                <TableCell>{t('entities:product.categoryId')}</TableCell>
            </>}
            trDefs={(row: Product) => (<>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.company?.businessName}</TableCell>
                <TableCell>{row.category?.description}</TableCell>
            </>)}
        />
    );
}