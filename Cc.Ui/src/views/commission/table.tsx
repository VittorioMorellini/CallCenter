import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Commission } from '../../models';

type Props = {
    items?: Commission[];
    onItemClick: (item: Commission, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.commission.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Commission) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:commission.description')}</TableCell>
                <TableCell>{t('entities:commission.percentage')}</TableCell>
            </>}
            trDefs={(row: Commission) => (<>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.percentage}</TableCell>
            </>)}
        />
    );
}