import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, useTheme, useMediaQuery, IconButton, SwipeableDrawer, Theme } from '@mui/material';
import {makeStyles} from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu';
import { useAppActions } from '../../../app/core';
import { Navigate, useNavigate, useLocation } from 'react-router';
import { RootState } from '../../../app/reducers';
import { useSelector } from 'react-redux';
import { Step } from '../../../app/core/reducer';

const drawerWidth = 200;
const breakpoint = 800;
const useStyle = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        marginLeft: drawerWidth,
        [theme.breakpoints.down(breakpoint)]: {
            marginLeft: 0
        }
    },
    appBar: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.7)'
    },
    drawer: {
        // height: 'calc(100% - 64px)',
        // marginTop: '64px',
        width: drawerWidth,
        // [theme.breakpoints.down(breakpoint)]: {
        //     height: '100%',
        //     marginTop: 0,
        // }
    },
    logoBar: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        marginLeft: 0,
        [theme.breakpoints.up(breakpoint)]: {
            marginLeft: '-8px',
        }
    },
    title: {
        fontWeight: 500,
        fontSize: '1.5rem'
    },
    content: {
        // marginLeft: drawerWidth,
        // [theme.breakpoints.down(breakpoint)]: {
        //     marginLeft: 0
        // }
        overflow: 'auto',
        height: 'calc(100vh - 64px)'
    }
}));

interface AppViewProps {

    navigation?: any;
    content: any;
}

export const AppView = ({
    navigation,
    content
}: AppViewProps) => {

    const theme = useTheme();
    const classes = useStyle();
    const mobile = useMediaQuery(theme.breakpoints.down(breakpoint));
    const [toggleDrawer, setToggleDrawer] = useState(true);

    // const history = useNavigate();
    // const loc = useLocation();
    // const [isLoginRoute, setIsLoginRoute] = useState(true);
    // useEffect(() => {
    //     setIsLoginRoute(loc.pathname.indexOf('login') > 0);
    // }, [loc])

    // const [initialized, setInitialized] = useState(false);
    let step = useSelector((root: RootState) => root.app.step);
    //let user = useSelector((root: RootState) => root.oidc.user);
    const { actions } = useAppActions();

    console.log('### APP_INIT ###')
    const handler = {
        init: async () => {
            
            // await actions.lookup()
            // if (step === Step.NONE && user && !user.expired) {
            //     await actions.init(user);
            //     history.push('/product');
            // } else if (step === Step.INIT) {

            //     try {
            //         // ho fatto un back dalla home, se sono da mobile tento di chiudere l'app
            //         window.close();
            //         history.push('/home');
            //     } catch {
            //         history.push('/home');
            //     }
                
            // }
        }
    }
    // useEffect(() => {
    //     // console.log('trying init', user)
    //     // if (!initialized && user) {
    //     //     console.log('init')
    //     //     handler.init()
    //     // }
    //     handler.init()
    // }, [])    
      
    return (
        <div className={classes.root}> {/* root */}
            {/* {!isLoginRoute ? (
            <> */}
            <AppBar position="sticky" className={classes.appBar}> {/* header */}
                <Toolbar>
                    <div style={{ flex: 1 }}>
                        <span className={classes.title}>{process.env.REACT_APP_TITLE}</span>
                    </div>
                    <div style={{ flex: '0 0 auto' }}>
                        {mobile ? (
                            <IconButton color="inherit" aria-label="Menu" onClick={() => setToggleDrawer(!toggleDrawer)}>
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                variant={!mobile ? 'permanent' : 'temporary'}
                open={toggleDrawer}
                onOpen={() => setToggleDrawer(true)}
                onClose={() => setToggleDrawer(false)}
                classes={{
                    paper: classes.drawer,
                }}
            >
                <AppBar position="sticky" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.logoBar}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/images/logo_sixtema.png`} height={32} className={classes.logo} />
                        </div>
                    </Toolbar>
                </AppBar>
                {navigation}
            </SwipeableDrawer>
            {/* </>) : null} */}
            <div className={classes.content}> {/* content (Switch router) */}
                {content}
            </div>
        </div>
    );
}