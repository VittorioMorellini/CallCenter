import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { EventType } from '../../models';

type Props = {
    items?: EventType[];
    onItemClick: (item: EventType, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.eventType.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: EventType) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:eventType.name')}</TableCell>
                <TableCell>{t('entities:eventType.description')}</TableCell>
            </>}
            trDefs={(row: EventType) => (<>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
            </>)}
        />
    );
}