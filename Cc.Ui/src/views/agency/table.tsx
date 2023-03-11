import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Agency } from '../../models';
import { useShowCompany } from '../../app/core/hooks';

type Props = {
    items?: Agency[];
    onItemClick: (item: Agency, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.agency.items);
    const showCompany = useShowCompany();

    return (
        <TableView
            items={rows}
            itemKey={(item: Agency) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                {showCompany ? <TableCell>{t('entities:principal.companyId')}</TableCell> : null}
                {/* <TableCell>{t('entities:agency.regionId')}</TableCell> */}
                <TableCell>{t('entities:agency.name')}</TableCell>
                <TableCell>{t('entities:agency.code')}</TableCell>
                <TableCell>{t('entities:agency.provinceCode')}</TableCell>
                <TableCell>{t('entities:agency.cityCode')}</TableCell>
                <TableCell>{t('entities:agency.address')}</TableCell>
                <TableCell>{t('entities:agency.cap')}</TableCell>
            </>}
            trDefs={(row: Agency) => (<>
                {showCompany ? <TableCell>{row.company?.businessName}</TableCell> : null}
                {/* <TableCell>{row.regionId}</TableCell> */}
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.provinceCode}</TableCell>
                <TableCell>{row.cityCode}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.cap}</TableCell>
            </>)}
        />
    );
}