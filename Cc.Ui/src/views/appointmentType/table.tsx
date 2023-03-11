import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { AppointmentType } from '../../models';

type Props = {
    items?: AppointmentType[];
    onItemClick: (item: AppointmentType, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.appointmentType.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: AppointmentType) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:appointmentType.type')}</TableCell>
                <TableCell>{t('entities:appointmentType.page')}</TableCell>
                <TableCell>{t('entities:appointmentType.role')}</TableCell>
            </>}
            trDefs={(row: AppointmentType) => (<>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.page}</TableCell>
                <TableCell>{row.role}</TableCell>
            </>)}
        />
    );
}