import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, useTheme, useMediaQuery, IconButton, SwipeableDrawer, Theme, Avatar, MenuItem, Divider, 
    Menu, Select, FormControl, InputLabel, Typography, Button, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavView } from './nav';
import { useAppActions } from '../core';
import { useConfiguration, useIdentity, useNavSections } from '../core/hooks';
import { blue } from '@mui/material/colors';
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { usePrincipalActions } from '../../core/principal';
import { Principal } from '../../models';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import clsx from 'clsx';
import { useLookups } from '../../core';
import {makeStyles} from '@mui/styles'
import { Navigate, Outlet, useNavigate } from 'react-router';
import { Dialog, DialogContent, LinearProgress } from '@mui/material';

const drawerWidth = 200;
const breakpoint = 800;
const useStyle = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        //marginLeft: ,
        [theme.breakpoints.down(breakpoint)]: {
            marginLeft: 0
        }
    },
    appBar: {
        'background-color': '#fff!important',
        color: 'rgba(0, 0, 0, 0.7)!important',
        //borderBottom: "2px solid",
        //boxShadow: "none",
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        // height: 'calc(100% - 64px)',
        // marginTop: '64px',
        width: drawerWidth,
        flexShrink: 0,
        // [theme.breakpoints.down(breakpoint)]: {
        //     height: '100%',
        //     marginTop: 0,
        // }
        //overflow: 'hidden'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // drawerHeader: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     padding: '0 8px',
    //     ...theme.mixins.toolbar,
    //     justifyContent: 'flex-end',
    //     minHeight: '60px!important'
    // },
    hide: {
        display: 'none!important',
    },
    // MuiAvatarRoot: {
    //     backgroundColor: null
    // },
    identityAvatar: {
        color: theme.palette.getContrastText(blue[600]),
        //backgroundColor: blue[600],
        backgroundColor: theme.palette.primary.main,
        //backgroundColor: '#1e88e5!important',
        boxShadow: theme.shadows[3]
    },
    logoBar: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        //minHeight: '60px'
    },
    logo: {
        marginLeft: 0,
        [theme.breakpoints.up(breakpoint)]: {
            marginLeft: '-8px',
        }
    },
    nav: {
        flex: 1,
        '&:hover': {
            overflow: 'auto'
        }
    },
    title: {
        fontWeight: 500,
        fontSize: '1.5rem'
    },
    version: {
        margin: '0.5rem 1rem'
    },
    content: {
        // marginLeft: drawerWidth,
        // [theme.breakpoints.down(breakpoint)]: {
        //     marginLeft: 0
        // }
        // MILO: 20210201  ... auto
        // Vitto: 20220604  hidden se no ho la doppia barra
        overflow: 'hidden',
        //overflow: 'none',
        height: 'calc(100vh - 64px)'
    }
}));

function LayoutView() {

    const theme = useTheme();
    const classes = useStyle(theme);
    const mobile = useMediaQuery(theme.breakpoints.down(breakpoint));
    const navSections = useNavSections();
    const { actions } = useAppActions();
    const toggleDrawer = useSelector((root: RootState) => root.app.drawer);
    const { isManager, isAdmin, identity } = useIdentity();
    const conf = useConfiguration();
    const { t } = useTranslation();
    const { actions: appActions } = useAppActions();
    const { initialized, isBusy } = useSelector((root: RootState) => root.app);
        
    const handleOpenDrawer = () => {
        var newDrawerState: boolean = !toggleDrawer;
        console.log('toggleDrawer before', toggleDrawer)
        actions.toggleDrawer(!toggleDrawer)
        console.log('toggleDrawer after in handle', toggleDrawer)
    }

    useEffect(() => {
        console.log('toggleDrawer use effect', toggleDrawer)
        if (!toggleDrawer)
            actions.toggleDrawer(true)
    }, [])
    
    useEffect(() => {
        console.log('toggleDrawer use effect', toggleDrawer)
    }, [toggleDrawer])

    useEffect(() => { 
        const init = async () => {
            if (identity && !initialized) {               
                await appActions.init(identity);
            }
        }   
        init();
    }, [identity]);
    
    if (!identity || identity.disabled) {
        return <Navigate replace to="/login" />
    }

    if (!initialized) {
        return (
            <Dialog 
                //disableBackdropClick={true} 
                open={isBusy}>
                <DialogContent>                    
                    <p>{t('common:loadingApplication')}</p>
                    <LinearProgress color="primary" style={{marginBottom: '1em'}} />
                </DialogContent>
            </Dialog>
        )
    }
    
    console.log('toggleDrawer', toggleDrawer)
    return (
        <div className={classes.root} style={{marginLeft: toggleDrawer ? drawerWidth : 0}}> {/* root */}
            <CssBaseline />            
            <AppBar position="sticky" className={classes.appBar}> {/* header */}
                {/*className={clsx(classes.appBar, {
                     [classes.appBarShift]: toggleDrawer && isBrowser,
                })*/}            
                <Toolbar>
                    <div style={{ flex: 1 }}>
                        <IconButton
                            id='drawerMenu'
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleOpenDrawer}
                            edge="start"
                            className={clsx(toggleDrawer && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        {isAdmin ? 
                        <>
                            <CompanySelector />
                            <AgencySelector />
                        </>
                        : isManager || identity.agencyIds.length > 1
                        ? <AgencySelector />
                        : null
                        // <span className={classes.title}><Typography variant="h5">{process.env.REACT_APP_TITLE}</Typography></span>                            
                        }
                    </div>
                    <div style={{ flex: '0 0 auto', display: 'flex' }}>
                        <UserAvatar />
                        {mobile ? (
                            <IconButton color="inherit" aria-label="Menu" onClick={() => actions.toggleDrawer(!toggleDrawer)}>
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                id='drawer'
                variant={!mobile ? 'persistent' : 'temporary'}
                open={toggleDrawer}
                className={classes.drawer}
                anchor="left"
                onOpen={() => actions.toggleDrawer(true)}
                onClose={() => actions.toggleDrawer(false)}
                classes={{paper: classes.drawerPaper}}
            >
                <AppBar position="sticky" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.logoBar}>
                            <img src="/images/logo.png" style={{maxWidth: 165, maxHeight: 43}} className={classes.logo} />
                        </div>
                        <IconButton onClick={handleOpenDrawer}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.nav}>
                    <NavView sections={navSections} />
                </div>
                <Typography variant="caption" className={classes.version}>{`vers. ${process.env.REACT_APP_VERSION}`}</Typography>
            </SwipeableDrawer>
            <div className={classes.content}> {/* content (Switch router) */}
                {/*children*/}
                <Outlet />
            </div>
        </div>
    );
}

const useAvatarStyle = makeStyles((theme: Theme) => ({
    root: {
        marginLeft: '1rem'
    },
    identityAvatar: {
        color: theme.palette.getContrastText(blue[600]),
        backgroundColor: blue[600],
        cursor: 'pointer'
    },
    paper: {
        marginRight: theme.spacing(2)
    },
    menu: {
        paddingTop: 0
    },
    appBar: {
        padding: theme.spacing(3),
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 400,
        fontSize: '0.875rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

function UserAvatar() {

    const classes = useAvatarStyle();
    const { initials, identity, companyId, role, isOperator} = useIdentity();
    const { actions: appActions } = useAppActions();
    const [open, setOpen] = useState(false);
    const avatarRef = useRef<any>(null);
    const userAvatar = useSelector((root: RootState) => root.app.userAvatar);
    const history = useNavigate();
    const {actions: principalActions} = usePrincipalActions();
    const { t } = useTranslation();

    console.log('initials', initials)
    const handler = {
        toggle: () => { setOpen(prevOpen => !prevOpen) },
        close: (event: React.MouseEvent<EventTarget>) => {
            if (avatarRef.current && avatarRef.current.contains(event.target as HTMLElement)) {
                return;
            }
            setOpen(false);
        },
        logout: (event: React.MouseEvent<EventTarget>) => {
            appActions.logout();
            handler.close(event);
        },
        settings: async () => {
            try
            {
                let item: Principal = await principalActions.find(identity.id);
                principalActions.itemSelected(item, 0);                
                history('/settings/' + identity.id);
            }
            catch(error)
            {
                // dispatch(failure(error));
                return Promise.reject(error);
            }
        }
    }

    return (
        <div className={classes.root}>
            <Avatar sx={{backgroundColor: (theme) => theme.palette.primary.main}}
                className={classes.identityAvatar}
                ref={avatarRef}
                onClick={handler.toggle}
            >{userAvatar ? <img src={userAvatar} style={{width: 40}} /> : initials}</Avatar>
            <Menu
                anchorEl={avatarRef.current}
                keepMounted
                open={open}
                MenuListProps={{disablePadding: true}}
                className={classes.menu}
                onClose={handler.close}
            >
                <div className={classes.appBar}>
                    <Avatar sx={{backgroundColor: (theme) => theme.palette.primary.main}} 
                        className={classes.identityAvatar}
                    >{userAvatar ? <img src={userAvatar} style={{width: 40}} /> : initials}</Avatar>
                    <div style={{marginTop: '1rem', fontWeight: 500}}>{`${identity?.name} ${identity?.surname}`}</div>
                    <div style={{fontSize:'0.75rem'}}>{`${identity?.mail}`}</div>
                </div>
                <Divider />
                <div style={{margin: '0.5em'}} />
                <MenuItem onClick={handler.settings}>{t('common:settings')}</MenuItem> 
                <div style={{padding: '0.5rem 1rem 1rem 1rem'}}>
                    <Button variant="outlined" onClick={handler.logout} style={{ width: '100%'}}>Logout</Button>
                </div>
            </Menu>
        </div>
    )
}

function CompanySelector() {

    const { t }  = useTranslation();
    const { actions: appActions } = useAppActions();
    const companies = useSelector((root: RootState) => root.lookup.companies);
    const companyId = useSelector((root: RootState) => root.app.currentCompanyId);

    return (
        <FormControl style={{width: 200, marginRight: '1rem'}}>
            <InputLabel>{t('views:company.index.title')}</InputLabel>
            <Select 
                onChange={(ev) => { 
                    appActions.setCompany(ev.target.value);
                }}
                value={companyId}
                size="small"
                variant='standard'
            >
                <MenuItem value={''} style={{fontWeight: 'bold'}}>{t('common:allCompany')}</MenuItem>
                {companies.map(x => <MenuItem key={x.id} value={x.id}>{x.businessName}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

function AgencySelector() {

    const { t }  = useTranslation();
    const { actions: appActions } = useAppActions();
    const { agencies } = useLookups();
    const agencyId = useSelector((root: RootState) => root.app.currentAgencyId);
    const { isManager, isAdmin } = useIdentity();

    return (
        <FormControl style={{width: 200}}>
            <InputLabel>{t('views:agency.index.title')}</InputLabel>
            <Select 
                onChange={(ev) => { appActions.setAgency(ev.target.value) }}
                value={agencyId}
                size="small"
                variant='standard'
            >
                {/* {(isSuperAdmin || isAdmin) ? <MenuItem value={''} style={{fontWeight: 'bold'}}>{t('common:allAgency')}</MenuItem> : null} */}
                <MenuItem value={''} style={{fontWeight: 'bold'}}>{t('common:allAgency')}</MenuItem>
                {agencies.map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default LayoutView;