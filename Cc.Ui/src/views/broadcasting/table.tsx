import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Broadcasting } from '../../models';

type Props = {
    items?: Broadcasting[];
    onItemClick: (item: Broadcasting, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.broadcasting.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Broadcasting) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:broadcasting.name')}</TableCell>
                <TableCell>{t('entities:broadcasting.type')}</TableCell>
                <TableCell>{t('entities:broadcasting.authorityName')}</TableCell>
                <TableCell>{t('entities:broadcasting.authorityData')}</TableCell>
                <TableCell>{t('entities:broadcasting.notes')}</TableCell>
            </>}
            trDefs={(row: Broadcasting) => (<>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.authorityName}</TableCell>
                <TableCell>{row.authorityData}</TableCell>
                <TableCell>{row.notes}</TableCell>
            </>)}
        />
    );
}