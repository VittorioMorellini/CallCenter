import * as React from 'react';
import { Card  } from '@mui/material';
import { StyleRules, withStyles } from '@mui/styles';

const styles: StyleRules = {
    root: {
        // margin: '1em'
    },
    header: {
        width: '100%',
        color: '#fff',
        padding: '0.5em 1em', 
        fontSize: '0.75em',
        fontWeight: 500
    }
};

interface BoxProps {

    title: string;
    color: string;
    children: React.ReactElement<any>;
    style: any;
    classes: any;
}

function Box(props: BoxProps) {

    let { classes, title, color, children } = props;

    return (
        <Card className={classes.root} style={...props.style}>
            <div className={classes.header} style={{backgroundColor: color}}>{title}</div>
            {children}
        </Card>
    );
}

export default withStyles(styles)(Box);