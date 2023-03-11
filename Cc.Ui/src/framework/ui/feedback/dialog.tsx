import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Theme, IconButton } from '@mui/material';
import { StyleRulesCallback, withStyles} from '@mui/styles';
import { i18n } from '../../i18n';
import { Breakpoint } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

import {cyan} from '@mui/material/colors';
import {amber} from '@mui/material/colors';
import {red} from '@mui/material/colors';

const styles: StyleRulesCallback<Theme, {}> = (theme: Theme) => ({
    dialog: { 
        width: '80%'
    },
    icon: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1) + 4,
        color: theme.palette.grey[500],
    }
});

interface BaseDialogProps {

    open: boolean;
    title?: string;
    message?: string;
    handleCancel?: () => void;
    handleConfirm: () => void;
    severity?: number;
    icon?: any;
    width?: Breakpoint;

    classes: any;
}

class BaseDialog extends React.Component<BaseDialogProps, any> {

    render() {

        let { classes } = this.props;

        let icon = this.props.icon;
        if (icon === undefined) {
            // tslint:disable-next-line: switch-default
            switch (this.props.severity) {
                case 1:
                    icon = <InfoIcon style={{color: cyan[500]}} />;
                    break;
                case 2:
                    icon = <WarningIcon style={{color: amber[500]}} />;
                    break;
                case 3:
                    icon = <ErrorIcon style={{color: red[500]}} />;
                    break;
            }
        }

        return (
            <Dialog
                //disableBackdropClick={true}
                disableEscapeKeyDown={true}
                maxWidth={this.props.width || 'xs'}
                open={this.props.open}
                classes={{paper: this.props.classes.dialog}}
            >
                <DialogTitle>                    
                    {this.props.title || ''}
                    {icon !== undefined ? (
                        <IconButton className={classes.icon}>
                            {icon}
                        </IconButton>          
                    ) : null}                       
                </DialogTitle>
                <DialogContent>
                    <p>{this.props.message || ''}</p>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleConfirm} color="primary">
                    {i18n.t('common:ok')}
                </Button>
                {this.props.handleCancel !== undefined ? (
                    <Button onClick={this.props.handleCancel} color="primary">
                        {i18n.t('common:cancel')}
                    </Button>
                ) : null}                
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(BaseDialog);