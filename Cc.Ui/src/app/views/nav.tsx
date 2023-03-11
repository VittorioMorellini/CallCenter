import React, { useState } from 'react';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowUp as UpIcon, KeyboardArrowDown as DownIcon }  from '@mui/icons-material';
import { useAppActions } from '../core';
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import { Icons } from '../../icons';
import { ColorUtils } from '../../framework/utils';
import {makeStyles} from '@mui/styles'

const icons = [];

export type NavSection = {
    title: string;
    routes: string[];
}

type DrawerItem = {
    route: string;
    list?: DrawerItem[];
}

interface DrawerItemProps {
    index: number;
    item: DrawerItem;
    currentRoute: string;
    navigate: (route: string) => void;
}

function DrawerMenuItem(props: DrawerItemProps) {

    let { route } = props.item;
    const { t } = useTranslation();
    const selected = props.currentRoute === route;

    return (
        <MenuItem 
            key={props.index} 
            // selected={props.currentRoute === route} 
            divider={false}
            style={{
                paddingTop: '0.5em', 
                paddingBottom: '0.5em',
                borderRight: selected ? `2px solid primary` : 0,
                backgroundColor: selected ? ColorUtils.toRGBA('#2c92ed', 0.2) : 'inherit'
            }}
            onClick={(e) => { props.navigate(route); }}
        >
            {/* <MenuIcon /> */}
            <Icons.Dot
                size={selected ? 6 : 4}
                style={{
                    marginRight: selected ? 8 : 9,
                    paddingLeft: selected ? 0 : 1,
                    fill: selected ? '#004c70' : 'rgba(0, 0, 0, 0.5)' // inherit'
                }}
            />
            <Typography
                variant="body1"
                style={{
                    fontWeight: selected ? 700 : 400,
                    color: selected ? '#004c70' : 'inherit'
                }}
            >{t(`views:${route}.index.title`)}</Typography>
            {/* <ListItemIcon style={{minWidth: '2rem'}}>
                // {icons[route] !== undefined ? icons[route] : <MenuIcon />}
                <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={t(`views:${route}.index.title`)} style={{fontWeight: props.currentRoute === route ? 700 : 400}} /> */}
        </MenuItem>
    );
}

const useMenuGroupStyles = makeStyles({
    root: {
        // marginLeft: '-16px',
        // marginRight: '-16px'
    },
    header: {
        backgroundColor: '#eee',
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.8)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        minHeight: 32
    },
    label: {
        flex: '1 0 auto'
    },
    icon: {
        flex: '0 1 auto',
        color: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
        // paddingLeft: '16px',
        // paddingRight: '16px'
    }
})

function MenuGroup({ title, children }: any) {

    const classes = useMenuGroupStyles();
    const [open, setOpen] = useState(true);

    return (

        <div className={classes.root}>
            <div className={classes.header} onClick={() => setOpen(!open)}>
                <div className={classes.label}><Typography variant="body1">{title}</Typography></div>
                <div className={classes.icon}>{open ? null : <DownIcon />}</div>
            </div>
            <div className={classes.content}>
                {open ? children : null}
            </div>
        </div>
    );
}


type NavProps = {
    sections: NavSection[]
}

export const NavView = ({
    sections
}: NavProps) => {

    const history = useNavigate();
    const { actions } = useAppActions();
    const currentRoute = useSelector((root: RootState) => root.app.currentRoute);

    const handler = {
        navigate: (route: string) => {
            history(`/${route}`);
            actions.navigate(route);
            console.log('route on click', route)
            // if (route === '/')
            //     actions.navigate('/principal');
        }
    }

    return (
        <MenuList style={{padding: 0, flex: 1}} variant="selectedMenu">
            {sections.map((item, index) => (
                <MenuGroup
                    key={index}
                    title={item.title}
                >
                    {item.routes.map((route, routeIndex) => (
                        <DrawerMenuItem 
                            key={routeIndex}
                            index={routeIndex} 
                            item={{route}} 
                            currentRoute={currentRoute} 
                            navigate={handler.navigate} 
                        />
                    ))}
                </MenuGroup>
            ))}
        </MenuList>
    );
}