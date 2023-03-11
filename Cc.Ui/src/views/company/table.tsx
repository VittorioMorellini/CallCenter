import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Company } from '../../models';

type Props = {
    items?: Company[];
    onItemClick: (item: Company, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.company.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Company) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:company.businessName')}</TableCell>
                <TableCell>{t('entities:company.vatCode')}</TableCell>
                {/* <TableCell>{t('entities:company.pdfPassword')}</TableCell> */}
            </>}
            trDefs={(row: Company) => (<>
                <TableCell>{row.businessName}</TableCell>
                <TableCell>{row.vatCode}</TableCell>
                {/* <TableCell>{row.pdfPassword}</TableCell> */}
            </>)}
        />
    );
}