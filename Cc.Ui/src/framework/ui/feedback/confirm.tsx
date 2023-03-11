import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ConfirmDialogProps = {
    open: boolean;
    message?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default ({
    open,
    message,
    onCancel,
    onConfirm
}: ConfirmDialogProps) => {

    const { t } = useTranslation();

    return (
        <Dialog
            //disableBackdropClick={true}
            disableEscapeKeyDown={true}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>{t('common:confirm')}</DialogTitle>
            <DialogContent>
                <Typography>{message || t('common:confirmDelete')}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    {t('common:cancel')}
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {t('common:ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}