import React, { useState } from 'react';
import { Entity } from '../../../entity';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { ListFieldImplementation, MaterialFieldImplementation, OutlinedFieldImplementation } from '../field';
import { SketchPicker } from 'react-color';
import { IconButton, Theme, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { Clear as ClearIcon } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
    color: {
        width: '68px',
        height: '36px',
        borderRadius: '2px',
        // display: 'inline-block',
        margin: 2
    },
    text: {
        flex: 1,
        alignSelf: 'center',
        justifySelf: 'center'
    },
    swatch: {
        // padding: '2px',
        background: '#fff',
        borderRadius: '4px',
        border: '1px solid #ccc',
        // boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
        // display: 'inline-block',
        cursor: 'pointer',

        width: '72px',
    },
    popover: {
        position: 'absolute',
        zIndex: 2,
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
    container: {
        display: 'flex', 
        flex: 1, 
        marginLeft: '1rem',
        '&:hover $clear': {
            display: 'flex'
        }
    },
    clear: {
        flex: 0,
        padding: 6,
        display: 'none'
    }
}));

export function ColorControl<T extends Entity>(props: any) {

    const classes = useStyles();
    const [displayPicker, setDisplayPicker] = useState(false);


    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                const handler = {
                    click: () => { 
                        setDisplayPicker(true) 
                    },
                    close: () => { 
                        setDisplayPicker(false) 
                    },
                    clear: (e: any) => { 
                        e.stopPropagation();
                        field.onValueChanged(null, undefined); 
                    }
                }

                let p = {
                    ...props,
                    name: props.name || field.name,
                    color: props.value || field.value,
                    onChange: (color: any) => {
                        console.log(color);
                        field.onValueChanged(color.hex, undefined);                        
                    }
                };

                return (
                    <div style={{display: 'flex'}}>
                        <div className={classes.swatch} onClick={handler.click}>
                            <div className={classes.color} style={{backgroundColor: p.color}} />
                        </div>
                        {displayPicker ? 
                            <div className={classes.popover}>
                                <div className={classes.cover} onClick={handler.close} />
                                <SketchPicker {...p} />
                            </div> 
                        : null}
                        <div className={classes.container}>
                            {props.hideColorHex ? null : 
                            <Typography className={classes.text} variant="caption">{p.color}</Typography>}
                            <div style={{flex: 1}} />
                            <IconButton className={classes.clear} onClick={handler.clear}><ClearIcon /></IconButton>
                        </div>
                    </div>
                )
            }}
        </FieldContext.Consumer>
    );
}

type ColorProps<T extends Entity> = FieldProps<T> & {
    hideColorHex?: boolean;
};

function handleProps<T extends Entity>(props: ColorProps<T>) {

    let p = { ...props };
    p.ControlProps = p.ControlProps || { ...props };

    return p;
}

export function ColorField<T extends Entity>(props: ColorProps<T>) {

    let p = handleProps(props);
    return fieldWithImplementationControl(p, MaterialFieldImplementation, ColorControl);
}

export function ColorListField<T extends Entity>(props: ColorProps<T>) {

    let p = handleProps(props);
    p.ControlProps.disableUnderline = true;

    return fieldWithImplementationControl(p, ListFieldImplementation, ColorControl);
}

export function ColorOutlinedField<T extends Entity>(props: ColorProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, ColorControl);
}