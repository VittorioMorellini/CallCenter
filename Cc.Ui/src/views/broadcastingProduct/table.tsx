import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { BroadcastingProduct } from '../../models';

type Props = {
    items?: BroadcastingProduct[];
    onItemClick: (item: BroadcastingProduct, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.broadcastingProduct.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: BroadcastingProduct) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                {/* <TableCell>{t('entities:broadcastingProduct.broadcastingId')}</TableCell> */}
                <TableCell>{t('entities:broadcastingProduct.productId')}</TableCell>
            </>}
            trDefs={(row: BroadcastingProduct) => (<>
                {/* <TableCell>{row.broadcastingId}</TableCell> */}
                <TableCell>{row.product?.description}</TableCell>
            </>)}
        />
    );
}