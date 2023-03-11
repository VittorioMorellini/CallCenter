import React from 'react';
import yup from 'yup';
import { Entity, EntityUtils, YupValidator } from '../entity';

interface FormProps<T> {

    className?: any;
    style?: any;
    as?: any;

    labelWidth?: number;
    resource?: string;

    item: T;
    handleChange: (item: T) => void;
    validator?: YupValidator;
    
    children?: any;
}

export interface FormContext<T> {
    item: T;
    // list: boolean;
    validator?: YupValidator;
    labelWidth: number;
    resource: string;
    handleChange: (item: T) => void;
}

export const FormContext = React.createContext<FormContext<any>>({} as any);

export class Form<T> extends React.Component<FormProps<T>, any> {

    render() {

        let { item, handleChange, validator } = this.props;
        let resource = this.props.resource || EntityUtils.isEntity(item) ? EntityUtils.resource(item as unknown as Entity) : '';

        let Container = this.props.as !== undefined ? this.props.as : BasicForm;

        return (
            <FormContext.Provider
                value={{
                    item,
                    resource,
                    labelWidth: this.props.labelWidth || 100,
                    handleChange,
                    validator
                }}
            >
                <Container className={this.props.className} children={this.props.children} style={this.props.style} />
            </FormContext.Provider>
        );
    }
}

function BasicForm(props: any) {

    return (
        <form className={props.className} style={props.style} autoComplete="off">
            {/* <input id="username" style={{display:'none'}} type="text" name="fakeusernameremembered" />
            <input id="password" style={{display:'none'}} type="password" name="fakepasswordremembered" /> */}
            {/* <input type="text" name="fakeUsername" id="fakeUsername" value="" style={{position: 'absolute', top: -5000, left: -5000}} />
            <input type="password" name="fakePassword" id="fakePassword" value="" style={{position: 'absolute', top: -5000, left: -5000}} /> */}
            {props.children}
        </form>
    );
}