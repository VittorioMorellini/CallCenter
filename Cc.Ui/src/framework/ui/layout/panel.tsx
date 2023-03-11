import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clxs from 'classnames';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     borderRadius: 2,
    //     backgroundColor: '#fff',
    //     margin: '1em',
    //     boxShadow: '0 4px 8px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    // },
    // header: {
    //     backgroundColor: '#eee',
    //     padding: '4px 16px',
    //     display: 'flex',
    //     alignItems: 'center',
    //     color: 'rgba(0, 0, 0, 0.8)',
    //     borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    // }
    root: {

        margin: '1rem',
        marginTop: 0,
        // marginBottom: '1em',
        background: '#fff',
        borderRadius: '2px',
        boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
        '&:first-child': {
            marginTop: '1rem'
        }
    },
    noMarginBottom: {
        marginBottom: 0
    },
    header: {        
        display: 'flex',
        padding: '1rem 1rem 0 1rem',
        color: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        // backgroundColor: '#fafafa'
    },
    title: {        
        // fontWeight: 500,
        // fontSize: '1.1em',
        flex: 1
    },
    actions: {
        flex: '0 1 auto'
    },
    content: {
        padding: '0 1rem 1rem 1rem',
    }
}));

type Props = {
    title?: string;
    actions?: any;
    style?: any;
    className?: any
    children?: any;
    noMarginBottom?: boolean;
    opened?: boolean;
    mode?: 'static' | 'accordion' | 'headerless';
}

export default ({children, title, actions, style, className, noMarginBottom: withoutBottomMargin, opened, mode}: Props) => {

    const classes = useStyles();

    mode = mode !== undefined ? mode : 'static';
    const [isOpen, setIsOpen] = useState(opened !== undefined ? opened : true);

    return (
        <div 
            className={clxs(
                classes.root, 
                withoutBottomMargin ? classes.noMarginBottom : '', 
                className)}
            style={style}
        >
            {mode !== 'headerless' &&
                <div 
                    className={classes.header}
                    onClick={(e: any) => {
                        if (mode === 'accordion')
                            setIsOpen(!isOpen);
                        }
                    }>
                    <div className={classes.title}><Typography variant="h6">{title}</Typography></div>
                    <div className={classes.actions}>{actions}</div>
                </div>
            }
            <div style={{paddingBottom: '1rem'}} />
            {isOpen ? <div className={classes.content}>{children}</div> : null}
        </div>
    )
}