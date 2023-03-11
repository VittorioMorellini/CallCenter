import * as React from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    appBar: {
        zIndex: 101,
        flex: '0 0 auto',
        position: 'relative'
    },
    tabsRoot: {
        minHeight: '2em',
        height: '2em'
    },
    tabsFlexContainer: {
        height: '2em'
    }
});
interface Props {
    title: string;
}

function Bar(props: Props) {

    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <AppBar className={classes.appBar} color="default">
            <Tabs
                classes={{
                    root: classes.tabsRoot,
                    flexContainer: classes.tabsFlexContainer
                }}
                value={0}
                variant="fullWidth"
            >
                <Tab label={t(props.title)} style={{ minHeight: '2em' }} />
            </Tabs>
        </AppBar>
    );
}

export default Bar;
