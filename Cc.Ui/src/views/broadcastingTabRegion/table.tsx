import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { BroadcastingTabRegion } from '../../models';

type Props = {
    items?: BroadcastingTabRegion[];
    onItemClick: (item: BroadcastingTabRegion, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.broadcastingTabRegion.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: BroadcastingTabRegion) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                {/* <TableCell>{t('entities:broadcastingTabRegion.broadcastingId')}</TableCell> */}
                <TableCell>{t('entities:broadcastingTabRegion.tabRegionId')}</TableCell>
            </>}
            trDefs={(row: BroadcastingTabRegion) => (<>
                {/* <TableCell>{row.broadcastingId}</TableCell> */}
                <TableCell>{row.tabRegion?.description}</TableCell>
            </>)}
        />
    );
}