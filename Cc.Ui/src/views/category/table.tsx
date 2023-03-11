import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Category } from '../../models';

type Props = {
    items?: Category[];
    onItemClick: (item: Category, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.category.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Category) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:category.description')}</TableCell>
                <TableCell>{t('entities:category.subProduct')}</TableCell>
            </>}
            trDefs={(row: Category) => (<>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.subProduct}</TableCell>
            </>)}
        />
    );
}