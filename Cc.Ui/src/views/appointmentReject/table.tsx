import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { AppointmentReject } from '../../models';

type Props = {
    items?: AppointmentReject[];
    onItemClick: (item: AppointmentReject, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.appointmentReject.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: AppointmentReject) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:appointmentReject.reject')}</TableCell>
            </>}
            trDefs={(row: AppointmentReject) => (<>
                <TableCell>{row.reject}</TableCell>
            </>)}
        />
    );
}