import React, { useState } from 'react';
import { createTheme, IconButton } from '@mui/material';
import { ViewBar } from './bar';
import { BusyIndicator, Confirm, Button } from '..';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {makeStyles} from '@mui/styles'

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        // '& > *': {
        //     margin: theme.spacing(1),
        //     width: '25ch',
        // },
        '& > *': {
            // margin: theme.spacing(1),
        },
        // height: 'calc(100vh - 128px)',
        // overflow: 'none'
    },
    appBar: {
        backgroundColor: '#fafafa',
        color: 'black',
        flex: '0 0 auto',
        position: 'relative'
    },
    backIcon: {
        padding: 0,
        fontSize: '1.5rem',
        color: 'inherit'
    },
    main: {
        display: 'flex',
        flex: 1,
        maxHeight: 'calc(100vh - 118px)',
        overflowY: 'auto'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        minWidth: 0,
        // overflowY: 'auto'
    },
    search: {
        display: 'flex',
        flexDirection: 'column',
        // height: '100%',
        width: 360,
        [theme.breakpoints.up('lg')]: {
            width: 420
        },
        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        },
        // height: 'calc(100vh - 128px)'
    },
    field: {
        // width: '90%'
    }
});

interface Props {
    title: string;
    isBusy: boolean;
    header?: any;
    content?: any;
    isUpdate: boolean;
    onBack?: () => void;
    onSave?: () => any;
    onDelete?: () => void;
    canSave?: boolean;
    canDelete?: boolean;
}

export default ({
    title,
    isBusy,
    content,
    isUpdate,
    onBack,
    onSave,
    onDelete,
    canSave,
    canDelete
}: Props) => {

    const classes = useStyles()
    const { t } = useTranslation();
    canSave = canSave === undefined ? true : canSave;
    canDelete = canDelete === undefined ? true : canDelete;
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <div className={classes.root}>
            <ViewBar 
                icon={onBack ? <IconButton onClick={onBack} className={classes.backIcon}><BackIcon /></IconButton> : undefined}
                title={title}
                actions={
                    <React.Fragment>
                        {onSave && canSave
                        ? <Button.Save onClick={onSave} /> : null}
                        {onDelete && canDelete && isUpdate
                        ? <Button.Delete onClick={() => setIsDeleteDialogOpen(true)} /> : null}
                    </React.Fragment>
                }
            />
            <BusyIndicator isBusy={isBusy} />
            <div className={classes.main}>
                <div className={classes.content}>
                    {content}
                </div>
            </div>
            <Confirm
                open={isDeleteDialogOpen}
                onCancel={() => setIsDeleteDialogOpen(false)}
                onConfirm={() => {
                    if (onDelete)
                        onDelete();
                    setIsDeleteDialogOpen(false)
                }}
            />
        </div>
    )
}