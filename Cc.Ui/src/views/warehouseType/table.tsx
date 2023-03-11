import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { WarehouseType } from '../../models';

type Props = {
    items?: WarehouseType[];
    onItemClick: (item: WarehouseType, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.warehouseType.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: WarehouseType) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:warehouseType.name')}</TableCell>
            </>}
            trDefs={(row: WarehouseType) => (<>
                <TableCell>{row.name}</TableCell>
            </>)}
        />
    );
}