import * as React from 'react';
import { FieldContext, FieldProps, fieldWithControl, Mode } from '../field';
import CSS from 'csstype';
import { Select, Input, MenuItem } from '@mui/material';
import { MenuItemProps } from '@mui/material/MenuItem';
import Error from './error';

class SelectControl<T> extends React.Component<any, any> {
    
    ref: any;

    constructor(props: any) {
        super(props);

        this.state = {
            mode: 'DISPLAY' as Mode
        };  
    }

    changeMode = (mode: Mode) => {
        if (this.state.mode !== mode) {
            this.setState({mode});
        }        
    }

    displayControl() {

        return (
            <FieldContext.Consumer>
                {(context: FieldContext<T>) => {
    
                    const { offset, offsetScale, top, left, height, width, scale, displayValue } = context;
                    const style: CSS.Properties = {
                        top: `${top + offset[1]}px`,
                        left: `${left + offset[0]}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        fontSize: `${scale + offsetScale}em`,
                        fontFamily: 'inherit',
                        position: 'absolute',
                        background: 'transparent',
                        border: 0,
                        zIndex: 100,
                        visibility: this.state.mode === 'DISPLAY' ? 'visible' : 'hidden'
                    };
    
                    return (
                        <input 
                            type="text" 
                            readOnly={true}
                            style={style}
                            // onFocus={() => this.changeMode('INPUT')}
                            onClick={() => this.changeMode('INPUT')}
                            value={displayValue}
                        />
                    );
                }}
            </FieldContext.Consumer>
        );
    }

    render () {

        return (
            <FieldContext.Consumer>
                {(context: FieldContext<T>) => {
    
                    const { top, left, height, width, scale, name, value, onValueChanged, validate } = context;
                    const style: CSS.Properties = {
                        top: `${top}px`,
                        left: `${left}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        fontSize: `${scale - 0.125}em`,
                        fontFamily: 'inherit',
                        position: 'absolute',
                        // background: 'white',
                        zIndex: 100,
                        visibility: this.state.mode === 'INPUT' ? 'visible' : 'hidden'
                    };

                    let p = {
                        ...this.props,
                        style,
                        name: this.props.name || name,
                        value: this.props.value || value,
                        open: this.state.mode === 'INPUT',
                        onChange: (e: any) => {
                            onValueChanged(e.target.value, e);
                            validate(e.target.value);
                        },
                        onClose: (e: any) => this.changeMode('DISPLAY'),
                    };
    
                    return (
                        <div>
                            {this.displayControl()}
                            <Select {...p} input={<Input />}>
                                {this.props.blank}
                                {this.props.options}
                            </Select>
                            <Error />
                        </div>
                    );
                }}
            </FieldContext.Consumer>
        );
    }    
}

type SelectProps<T> = FieldProps<T> & {
    blank?: boolean | React.ReactElement<MenuItemProps>;
    options?: any;
};

export function SelectField<T>(props: SelectProps<T>) {

    let p = {...props};
    p.offsetScale = p.offsetScale || -0.125;
    p.ControlProps = p.ControlProps || {};
    p.ControlProps.blank =  p.ControlProps.blank || props.blank;
    p.ControlProps.options =  p.ControlProps.options || props.options;
    
    return fieldWithControl(p, SelectControl);
}

export function selectOptions<T>(list: T[], value: (item: T) => any, label: (item: T) => any) {
    return list.map((item, index) => <MenuItem key={index} value={value(item)}>{label(item)}</MenuItem>);
}