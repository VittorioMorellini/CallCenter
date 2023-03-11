import React, { useRef, useState } from 'react';
import { useMediaQuery, useTheme, IconButton, createTheme } from '@mui/material';
import { ViewBar } from './bar';
import { Button } from '..';
import { useWidth } from '../../hooks';
import { DragIndicator as ViewIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import BusyIndicator from '../feedback/busyIndicator';
import { useTranslation } from 'react-i18next';
import {makeStyles} from '@mui/styles'

const theme = createTheme()
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
    viewIcon: {
        padding: 0,
        fontSize: '1.5rem',
        color: 'inherit'
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
    mainSmall: {
        display: 'flex',
        flex: 1,
        maxHeight: 'calc(100vh - 48px)',
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

const useLayoutVisibility = () => {

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const width = useWidth();
    const [searchVisible, setSearchVisible] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);

    // useEffect(() => {
    //     let value = width === 'md' || width === 'lg' || width === 'xl';
    //     setSearchVisible(value);
    // }, [width]);

    const isContentVisible = (mobile && !searchVisible) || !mobile;
    const isSearchVisible = searchVisible;

    return {
        isContentVisible, 
        isSearchVisible, 
        setSearchVisible,
    }
}

interface Props {
    title: string;
    isBusy: boolean;
    actions?: any;
    content?: any;
    search?: any;
    onAdd?: () => void;
    onBack?: () => void;
    headerSize?: 'normal' | 'small';
    onExport?: () => void;
    hideFilter?: boolean;
    prevActions?: any;
}

export default ({
    title,
    isBusy,
    actions,
    content,
    search,
    hideFilter,
    onAdd,
    onBack,
    headerSize,
    onExport,
    prevActions
}: Props) => {

    const classes = useStyles();
    const mainClass = headerSize === 'small' ? classes.mainSmall : classes.main
    const { t } = useTranslation();
    const { isContentVisible, isSearchVisible, setSearchVisible } = useLayoutVisibility();

    return (
        <div className={classes.root}>
            <ViewBar 
                icon={onBack
                ? <IconButton onClick={onBack} className={classes.backIcon}><BackIcon /></IconButton> 
                : <IconButton className={classes.viewIcon}><ViewIcon /></IconButton>}
                title={title}
                actions={
                    <>
                        {prevActions ? prevActions : null}
                        {onAdd ? <Button.Add onClick={onAdd} />  : null}
                        {onExport ? <Button.Export onClick={() => onExport()} /> : null}
                        {!hideFilter && <Button.Filter onClick={() => setSearchVisible(!isSearchVisible)} />}
                        {actions}
                    </>
                }
            />
            <BusyIndicator isBusy={isBusy} />
            <div className={mainClass}>                
                {isContentVisible ? (
                    <div className={classes.content}>
                        {content}
                    </div>
                ) : null}
                {isSearchVisible ? (
                    <div className={classes.search}>
                        {search}
                    </div>
                ) : null}
            </div>
        </div>
    )
}