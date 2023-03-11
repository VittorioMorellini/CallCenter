import * as React from 'react';
import { FieldImplementationProps, FieldContext, fieldWithImplementation, FieldProps } from '../../form';
import { ListItem, Typography, FormLabel, FormControl, FormHelperText, Tooltip, Theme } from '@mui/material';
import Up from '@mui/icons-material/KeyboardArrowUp';
import Down from '@mui/icons-material/KeyboardArrowDown';
import { Entity } from '../../entity';
import { makeStyles } from '@mui/styles'

export function MaterialFieldImplementation<T extends Entity>(props: FieldImplementationProps<T>) {

    let { child, fieldContext, label, error, required, disabled, className, LabelProps, helper, errorMessage } = props;

    // deve stare fuori
    let controlStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        flex: 1,
        padding: '4px 0px', // TODO useStyle con theme
        width: '100%',
        ...props.style
    };

    let labelStyle = LabelProps.style || {};
    labelStyle.fontSize = '0.75rem';

    return (
        <FormControl error={error} className={className} style={controlStyle} disabled={disabled}>
            <FormLabel error={error} style={labelStyle} required={required}>{label}</FormLabel>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', width: '100%' }}>
                <FieldContext.Provider value={fieldContext}>
                    {child}
                </FieldContext.Provider>
                {helper || error ? <FormHelperText>{errorMessage || helper}</FormHelperText> : null}
            </div>
        </FormControl>
    );
}

export function ListFieldImplementation<T extends Entity>(props: FieldImplementationProps<T>) {

    let { child, fieldContext, label, LabelProps, disabled } = props;

    let labelStyle = LabelProps.style || {};
    labelStyle.flex = `0 0 ${LabelProps.width}px`;
    labelStyle.maxWidth = `${LabelProps.width}px`;
    labelStyle.fontSize = '0.875rem';
    labelStyle.paddingRight = '1rem';

    let labelControl = (
        <div style={labelStyle}>
            <Typography style={LabelProps.style}>{label}</Typography>
        </div>
    );

    if (props.error) {
        labelControl = (
            <Tooltip title={props.errorMessage || ''}>
                <div style={labelStyle}>
                    <Typography style={LabelProps.style}>{label}</Typography>
                </div>
            </Tooltip>
        )
    }

    return (
        <ListItem
            style={{ ...props.style, display: 'flex' }}
            className={props.className}
            disabled={disabled}
            divider={true}
        >
            {labelControl}
            <div style={{ flex: '1 0 auto' }}>
                <FieldContext.Provider value={fieldContext}>
                    {child}
                </FieldContext.Provider>
            </div>
        </ListItem>
    );
}

export function OutlinedFieldImplementation<T extends Entity>(props: FieldImplementationProps<T>) {

    let { required, disabled, error, errorMessage, className, child, helper, fieldContext, label, LabelProps } = props;

    // deve stare fuori
    let controlStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        flex: 1,
        padding: '4px 0px', // TODO useStyle con theme
        ...props.style
    };

    let labelStyle = LabelProps.style || {};
    labelStyle.flex = `0 0 ${LabelProps.width}px`;
    labelStyle.maxWidth = `${LabelProps.width}px`;
    labelStyle.fontSize = '0.875rem';
    labelStyle.paddingRight = '1rem';
    labelStyle.alignSelf = 'center';
    // labelStyle.color = error ? 'inherit' : LabelProps.style.color;

    return (
        <FormControl error={error} className={className} style={controlStyle} disabled={disabled}>
            <FormLabel error={error} style={labelStyle} required={required}>{label}</FormLabel>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                <FieldContext.Provider value={fieldContext}>
                    {child}
                </FieldContext.Provider>
                {helper || error ? <FormHelperText>{errorMessage || helper}</FormHelperText> : null}
            </div>
        </FormControl>
    );
}

export function MaterialField<T extends Entity>(props: FieldProps<T>) {
    return fieldWithImplementation(props, MaterialFieldImplementation);
}

export function ListField<T extends Entity>(props: FieldProps<T>) {
    return fieldWithImplementation(props, ListFieldImplementation);
}

interface FieldGroupProps {

    header: string;
    children?: any;
}
export class FieldGroup extends React.Component<FieldGroupProps, any> {

    state = { visible: true };

    styles = {
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
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
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
    };

    toggleHeader = (e: any) => {
        this.setState((prevState: any) => {
            return {
                visible: !prevState.visible
            };
        });
    }

    render() {

        let { styles } = this;

        return (
            <div style={styles.root}>
                <div
                    style={styles.header}
                    onClick={this.toggleHeader}
                >
                    <div style={styles.label}>{this.props.header}</div>
                    <div style={styles.icon}>{this.state.visible ? <Up /> : <Down />}</div>
                </div>
                <div style={styles.content}>
                    {this.state.visible ? this.props.children : null}
                </div>
            </div>
        );
    }
}

const useSyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        // soluzione temporanea, con flex calcola male la width dei child se si imposta un margin
        '& :not(:last-child)': {
            marginRight: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            '& :not(:first-child)': {
                marginRight: 0
            },
        }
    }
}));

export const FieldRow = ({ children }: any) => {

    const classes = useSyles();
    return <div className={classes.root}>{children}</div>;
};