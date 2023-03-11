import * as React from 'react';
import { Fab } from '@mui/material';

interface FabProps {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    onClick: (e: any) => void;
    icon?: any;
    children?: any;
    style?: any;
    zIndex?: number;
    color?: 'primary' | 'secondary' | 'inherit' | 'default' | undefined;
}

export default function(props: FabProps) {

    let position = props.position || 'bottom-right';
    let zIndex = props.zIndex || 10;
    let style: any = { ...props.style, position: 'fixed', zIndex: zIndex };

    switch (position) {
        case 'bottom-right':
            style = { ...style, bottom: 20, right: 20 };
            break;
        case 'bottom-left':
            style = { ...style, bottom: 20, left: 20 };
            break;
        case 'top-right':
            style = { ...style, top: 20, right: 20 };
            break;
        case 'top-left':
            style = { ...style, top: 20, left: 20 };
            break;
    }

    return (
        <Fab 
            color={props.color} 
            style={style} 
            onClick={props.onClick}
        >
            {props.icon || props.children}
        </Fab>
    )
};