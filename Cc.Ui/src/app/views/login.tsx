import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, LinearProgress, Button, Typography, Theme, TextField, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RootState } from '../reducers';
import { useAppActions } from '../core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        top: 0,
        left: 0,
        position: 'absolute',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(\'images/background.jpg\')',
        backgroundSize: '100vw 100vh',
        [theme.breakpoints.down('sm')]: {
            backgroundImage: 'none',
            backgroundColor: '#eee'
        }
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    content: {
        margin: 'auto',
        height: '50vh',
        textAlign: 'center'
    },
    logo: {
        display: 'block', 
        margin: '0 auto',
        maxWidth: '480px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '360px',
        }
    },
    sixtema: {
        display: 'block', 
        margin: '0 auto',
        height: 90
    },
    text: {
        color: 'rgba(0, 0, 0, 0.8)'
    },
    button: {
        marginTop: '2em'
    },
    form: {
        margin: 'auto',
        padding: '10px',
        border: '1px solid #c9c9c9',
        borderRadius: '5px',
        background: '#f5f5f5',
        width: '220px',
        display: 'block'
    }   
}));

function LoginView() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();  
    const { t }  = useTranslation();
    const { actions } = useAppActions();
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const p = useSelector((root: RootState) => ({
        //user: root.oidc.user,
        isBusy: false, // root.app.isBusy,
        logout: false // root.app.logout
    }));
    
    const login = (e: any) => {
        actions.login(username, password)
            .then(() => {
                navigate('/');
                console.log('route principal')
                actions.navigate('/principal')
            })
            .catch((error: any) => console.log(error));
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if(event.target.name === 'username')
            setUsername(event.target.value)
        else
            setPassword(event.target.value)
    }
    
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        console.log('do login on key down')
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          login(event);
        }
    }

    
    if (p.logout) {
        return (
            <Dialog 
                //disableBackdropClick={true} 
                open={true}>
                <DialogContent>                    
                    <p>{t('common:logoutInProgress')}</p>
                    <LinearProgress color="primary" style={{marginBottom: '1em'}} />
                </DialogContent>
            </Dialog>
        );
    } else {
        return (
            <div className={classes.root} onKeyDown={onKeyDown}>
                <div className={classes.container}>
                    <div className={classes.content}>
                        <img src="images/logo.png" className={classes.logo} />
                        <Typography variant="h3" className={classes.text}>{process.env.REACT_APP_TITLE}</Typography>                     
                        <form className={classes.form}>
                            <Box >
                                <label htmlFor='username'>Username</label>
                                <TextField
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={handleInputChange}
                                    size='small'
                                    autoFocus={true}
                                />
                            </Box>
                            <Box >
                                <label htmlFor='password'>Password</label>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handleInputChange}
                                    size='small'
                                />                                
                            </Box>
                            <Box sx={{mt: 1}}>
                                <Button variant="contained" color="primary" onClick={login} className={classes.button}>{t('common:login')}</Button>
                            </Box>
                        </form>                        
                    </div>
                    {/* <img src="/images/sixtema.png" className={classes.sixtema} /> */}
                </div>
            </div>
        );
    }
}

export default LoginView;