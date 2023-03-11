import * as React from 'react';
import { FieldContext, FieldProps, fieldWithControl, Mode } from '../field';
import CSS from 'csstype';
import { isNullOrUndefined } from 'util';
import Error from './error';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';

class DateControl<T> extends React.Component<any, any> {

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
    
    componentDidUpdate() {

        if (!isNullOrUndefined(this.ref)) {
            if (this.state.mode === 'INPUT') {
                this.ref.open();
            } else {
                this.ref.close();
            }
        }
    }

    displayControl() {

        return (
            <FieldContext.Consumer>
                {(context: FieldContext<T>) => {
    
                    const { offset, offsetScale, top, left, height, width, scale, displayValue, name } = context;
                    const style: CSS.Properties = {
                        top: `${top + offset[1]}px`,
                        left: `${left + offset[0]}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        fontSize: `${scale + offsetScale}em`,
                        position: 'absolute',
                        background: 'transparent',
                        border: 0,
                        zIndex: 100
                    };
    
                    return (
                        <input 
                            type="text" 
                            readOnly={true}
                            style={style}
                            // onFocus={() => changeMode('INPUT')} // manda tutto a ramengo
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
    
                    const { value, onValueChanged, validate, name } = context;
                    const style = {
                        display: 'none'
                    };

                    let p = {
                        ...this.props,
                        style,
                        name: this.props.name || name,
                        value: this.props.value || value,
                        onChange: (date: any) => {
                            onValueChanged(date, undefined);
                            validate(date);
                        },
                        onClose: () => this.changeMode('DISPLAY'),
                        ref: (component: any) => this.ref = component,
                        autoOk: this.props.autoOk || false
                    };
    
                    return (
                        <div>
                            {this.displayControl()}
                            <DatePicker 
                                {...p} 
                                renderInput={(params) => <TextField {...params} size='small'/>}                                            
                            />
                            <Error />
                        </div>
                    );
                }}
            </FieldContext.Consumer>
        );
    }    
}

export function DateField<T>(props: FieldProps<T>) {

    let p = {...props};
    p.offsetScale = p.offsetScale || -0.125;
    // p.onGetValue = p.onGetValue || ((date: any) => date !== undefined ? moment(date) : '');
    // p.getDisplayValue = (date: any) => date !== undefined ? date.format('DDMMYYYY') : '';
    /*p.onChangeMode = (mode: Mode, inputRef: any) => {

        console.log(mode, inputRef);
        if (!isNullOrUndefined(inputRef)) {

            if (inputRef.state.open) {
                console.log('already open');
                inputRef.close();
            } else if (mode === 'INPUT') {
                console.log('open a ', inputRef.state);
                inputRef.open();
                console.log('open b', inputRef.state);
            } else if (mode === 'DISPLAY') {
                console.log('close');
                inputRef.close();
            }
        }        
    };*/
    
    return fieldWithControl(p, DateControl);
}