import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Warehouse } from '../../models';

type Props = {
    items?: Warehouse[];
    onItemClick: (item: Warehouse, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.warehouse.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Warehouse) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:warehouse.description')}</TableCell>
                <TableCell>{t('entities:warehouse.salesmanId')}</TableCell>
                <TableCell>{t('entities:warehouse.warehouseTypeId')}</TableCell>
            </>}
            trDefs={(row: Warehouse) => (<>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.salesmanId}</TableCell>
                <TableCell>{row.warehouseType?.name}</TableCell>
            </>)}
        />
    );
}