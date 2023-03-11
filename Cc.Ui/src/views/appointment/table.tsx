import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Appointment } from '../../models';

type Props = {
    items?: Appointment[];
    onItemClick: (item: Appointment, index: number) => void;
    onItemDelete?: (id: number) => void
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.appointment.items);

    return (
        <TableView
            items={rows}
            itemKey={(item: Appointment) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}            
            thDefs={<>
                <TableCell>{t('entities:appointment.eventId')}</TableCell>
                <TableCell>{t('entities:appointment.appointmentTypeId')}</TableCell>
                <TableCell>{t('entities:appointment.appointmentEndingId')}</TableCell>
                <TableCell>{t('entities:appointment.motivation')}</TableCell>
                <TableCell>{t('entities:appointment.salesmanId')}</TableCell>
                <TableCell>{t('entities:appointment.customerId')}</TableCell>
                <TableCell>{t('entities:appointment.district')}</TableCell>
                <TableCell>{t('entities:appointment.productId')}</TableCell>
                <TableCell>{t('entities:appointment.dateFrom')}</TableCell>
                <TableCell>{t('entities:appointment.dateTo')}</TableCell>
                <TableCell>{t('entities:appointment.state')}</TableCell>
            </>}
            trDefs={(row: Appointment) => (<>
                <TableCell>{row.eventId}</TableCell>
                <TableCell>{row.appointmentTypeId}</TableCell>
                <TableCell>{row.appointmentEndingId}</TableCell>
                <TableCell>{row.motivation}</TableCell>
                <TableCell>{row.salesmanId}</TableCell>
                <TableCell>{row.customerId}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.productId}</TableCell>
                <TableCell>{row.dateFrom}</TableCell>
                <TableCell>{row.dateTo}</TableCell>
                <TableCell>{row.state}</TableCell>
            </>)}
        />
    );
}