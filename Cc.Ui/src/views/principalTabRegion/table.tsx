import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { PrincipalTabRegion } from '../../models';

type Props = {
    items?: PrincipalTabRegion[];
    onItemClick: (item: PrincipalTabRegion, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.principalTabRegion.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: PrincipalTabRegion) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                {/* <TableCell>{t('entities:principalTabRegion.principalId')}</TableCell> */}
                <TableCell>{t('entities:principalTabRegion.tabRegionId')}</TableCell>
            </>}
            trDefs={(row: PrincipalTabRegion) => (<>
                {/* <TableCell>{row.principalId}</TableCell> */}
                <TableCell>{row.tabRegion?.description}</TableCell>
            </>)}
        />
    );
}