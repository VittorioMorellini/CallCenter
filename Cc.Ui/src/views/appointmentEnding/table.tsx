import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { AppointmentEnding } from '../../models';

type Props = {
    items?: AppointmentEnding[];
    onItemClick: (item: AppointmentEnding, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.appointmentEnding.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: AppointmentEnding) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:appointmentEnding.outcome')}</TableCell>
                <TableCell>{t('entities:appointmentEnding.color')}</TableCell>
            </>}
            trDefs={(row: AppointmentEnding) => (<>
                <TableCell>{row.outcome}</TableCell>
                <TableCell>{row.color}</TableCell>
            </>)}
        />
    );
}