import * as React from 'react';
import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles'
const styles = {
    root: {
        display: 'flex',
        width: '100%'
    },
    left: {
        flex: '0 0 auto'
    },
    center: {
        flex: '1 0 auto'
    },
    right: {
        flex: '0 0 auto'
    },
    primary: {
        color: 'rgba(0, 0, 0, 0.87)'
    },
    secondary: {
        color: 'rgba(0, 0, 0, 0.54)'
    }
};

interface Props {

    primary: string;
    secondary?: string;
    left?: any;
    right?: any;
}

type InnerProps = Props & {
    classes: any
};

function InnerListItem(props: InnerProps) {

    let { classes, primary, secondary, left, right } = props;

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                {left}
            </div>
            <div className={classes.center}>
                <Typography variant="subtitle1" className={classes.primary}>
                    {primary}
                </Typography>
                <Typography variant="body2" className={classes.secondary}>
                    {secondary}
                </Typography>
            </div>
            <div className={classes.right}>
                {right}
            </div>
        </div>
    );
}

export const ListItem = withStyles(styles)(InnerListItem);