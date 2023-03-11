import * as React from 'react';
import { FieldContext, FieldProps, fieldWithControl, Mode } from '../field';
import CSS from 'csstype';
import Error from './error';

class InputControl<T> extends React.Component<any, any> {

    ref: any;

    constructor(props: any) {
        super(props);

        this.state = {
            mode: 'DISPLAY' as Mode
        };  
    }

    componentDidUpdate() {

        this.ref.focus();
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
                            onFocus={() => this.changeMode('INPUT')}
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
    
                    const { offsetScale, top, left, height, width, scale, value, onValueChanged, validate, name } = context;
                    const style: CSS.Properties = {
                        top: `${top}px`,
                        left: `${left}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        fontSize: `${scale + offsetScale}em`,
                        fontFamily: 'inherit',
                        position: 'absolute',
                        background: 'white',
                        border: '1px solid cyan',
                        zIndex: 100,
                        visibility: this.state.mode === 'INPUT' ? 'visible' : 'hidden'
                    };
    
                    return (
                        <div>
                            {this.displayControl()}
                            <input 
                                id={name} 
                                name={name} 
                                type="text" 
                                style={style} 
                                value={value}
                                onChange={(e: any) => onValueChanged(e.target.value, e)}
                                onBlur={() => {
                                    this.changeMode('DISPLAY');
                                    validate(this.ref.value);
                                }}  
                                ref={(component) => this.ref = component}
                            />
                            <Error />
                        </div>
                    );
                }}
            </FieldContext.Consumer>
        );
    }    
}

export function InputField<T>(props: FieldProps<T>) {

    let p = {...props};
    p.offsetScale = p.offsetScale || -0.125;
    
    return fieldWithControl(p, (InputControl));
}