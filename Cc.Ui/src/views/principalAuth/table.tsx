import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { PrincipalAuth } from '../../models';
import { getLabel} from '../../core';

type Props = {
    items?: PrincipalAuth[];
    onItemClick: (item: PrincipalAuth, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.principalAuth.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: PrincipalAuth) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:principalAuth.agencyId')}</TableCell>
                <TableCell>{t('entities:principalAuth.productId')}</TableCell>
                <TableCell>{t('entities:principalAuth.categoryId')}</TableCell>
            </>}
            trDefs={(row: PrincipalAuth) => (<>
                {/* <TableCell>{row.principalId}</TableCell> */}
                <TableCell>{row.agency ? row.agency.name : row.agencyId}</TableCell>
                <TableCell>{row.product?.description}</TableCell>
                <TableCell>{row.category?.description}</TableCell>
                {/* <TableCell>{row.userPath}</TableCell> */}
            </>)}
        />
    );
}