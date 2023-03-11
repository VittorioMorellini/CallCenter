import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TableCell } from '@mui/material';
import { TableView } from '../../framework/ui/';
import { RootState } from '../../app/reducers';
import { Principal } from '../../models';
import { usePrincipalActions } from '../../core/principal';
import { PageLoader } from '../../framework/core/types';

type Props = {
    items?: Principal[];
    onItemClick: (item: Principal, index: number) => void;
    onItemDelete?: (id: number) => void
    pageLoader?: PageLoader;
};

export default ({
    items,
    onItemClick,
    onItemDelete
}: Props) => {

    const { t } = useTranslation();
    const rows = items || useSelector((root: RootState) => root.principal.items);
    const { pageLoader } = usePrincipalActions();

    return (
        <TableView
            items={rows}
            itemKey={(item: Principal) => item.id}
            onItemClick={onItemClick}
            onItemDelete={onItemDelete}
            rowStyle={(item: Principal, index: number) => item.disabled ? { textDecoration: 'line-through' } : undefined}
            pageLoader={pageLoader}         
            thDefs={<>
                <TableCell>{t('entities:principal.surname')}</TableCell>
                <TableCell>{t('entities:principal.name')}</TableCell>
                <TableCell>{t('entities:principal.mail')}</TableCell>
                <TableCell>{t('entities:principal.appointments')}</TableCell>
            </>}
            trDefs={(row: Principal) => (<>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.name}</TableCell>
                {/* <TableCell>{row.taxCode}</TableCell> */}
                <TableCell>{row.mail}</TableCell>
                <TableCell>{row.appointment?.length}</TableCell>
            </>)}
        />
    );
}