import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import { Alert, AlertColor } from '@mui/lab';
import { LoggerServiceContext, LoggerServiceOptions } from './types';

const LoggerServiceProvider = ({ children }: any) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor | undefined>();

    const handler = {
        close: () => setOpen(false)
    }

    const logger = (options: LoggerServiceOptions) => {

        const core = {
            debug: (text: string, title?: string) => {
                if (process.env.NODE_ENV === 'development') {
                    if (options.key)
                        console.info(options.key, text)
                    else
                        console.info(text)
                }
            },
            success: (text: string, title?: string) => {
                core.log("success", text);
                if (options.key)
                    console.info(options.key, text)
                else
                    console.info(text)
            },
            info: (text: string, title?: string) => {
                core.log("info", text);
                if (options.key)
                    console.info(options.key, text)
                else
                    console.info(text)
            },
            warning: (text: string, title?: string) => {
                core.log("warning", text);
                if (options.key)
                    console.warn(options.key, text)
                else
                    console.warn(text)
            },
            error: (text: string, title?: string) => {
                core.log("error", text);
                if (options.key)
                    console.error(options.key, text)
                else
                    console.error(text)
            },
            log: (severity: AlertColor, text: string, title?: string) => {
                    
                setSeverity(severity);
                setMessage(text);
                setOpen(true);
            }
        }

        return core;
    }

    return (
        <>
            <LoggerServiceContext.Provider
                value={logger}
                children={children}
            />
            <Snackbar 
                open={open} 
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                // anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handler.close}
            >
                <Alert onClose={handler.close} severity={severity} style={{minWidth: 300}}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default LoggerServiceProvider;