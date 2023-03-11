import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Measure } from '../../models';

type Props = {
    items?: Measure[];
    onItemClick: (item: Measure, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.measure.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Measure) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:measure.description')}</TableCell>
                <TableCell>{t('entities:measure.name')}</TableCell>
            </>}
            trDefs={(row: Measure) => (<>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.name}</TableCell>
            </>)}
        />
    );
}