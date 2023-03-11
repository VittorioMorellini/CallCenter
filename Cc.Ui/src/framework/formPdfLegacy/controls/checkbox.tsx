import React from 'react';
import { FieldContext, FieldProps, fieldWithControl } from '../field';
import CSS from 'csstype';
import ConfirmIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/Clear';
import Error from './error';

class CheckboxControl<T> extends React.Component<any, any> {
    
    render () {

        return (
            <FieldContext.Consumer>
                {(context: FieldContext<T>) => {
    
                    const { offset, offsetScale, top, left, height, width, scale, value, onValueChanged, validate, name } = context;
                    const style: CSS.Properties = {
                        top: `${top + offset[1]}px`,
                        left: `${left + offset[0]}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        fontSize: `${scale + offsetScale}em`,
                        fontFamily: 'inherit',
                        position: 'absolute',
                        cursor: 'hand',
                        zIndex: 100
                    };

                    let p = {
                        style,
                        name: this.props.name || name,
                        onClick: (e: any) => {
                            onValueChanged(!value, e);
                            validate(!value);
                        }
                    };

                    const iconStyle = {
                        ...this.props.style,
                        fontSize: 'inherit'
                    };

                    let checked = undefined;
                    switch (this.props.icon) {
                        case 'CHECK':
                            checked = <ConfirmIcon style={iconStyle} />;
                            break;
                        case 'CROSS':
                            checked = <CrossIcon style={iconStyle} />;
                            break;
                        default:
                            checked = this.props.icon({style: iconStyle});
                    } 
                    return (
                        <div>
                            <div {...p}>
                                {value ? checked : null}                                
                            </div>
                            <Error />
                        </div>
                    );
                }}
            </FieldContext.Consumer>
        );
    }    
}

type CheckBoxProps<T> = FieldProps<T> & {
    icon?: 'CHECK' | 'CROSS' |  ((props: any) => React.ReactNode)
    style?: any;
};

export function CheckboxField<T>(props: CheckBoxProps<T>) {

    let p = {...props};
    p.offsetScale = p.offsetScale || 0.25;
    p.ControlProps = p.ControlProps || {};
    p.ControlProps.icon = p.ControlProps.icon || props.icon || 'CHECK';
    p.ControlProps.style = p.ControlProps.style || props.style;
    
    return fieldWithControl(p, CheckboxControl);
}