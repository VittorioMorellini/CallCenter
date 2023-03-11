import * as React from 'react';
import { Entity } from '../../../entity';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { OutlinedFieldImplementation } from '../field';
import DatePicker from '@mui/lab/DatePicker';
import { OutlinedInput, TextField, TextFieldProps } from '@mui/material';
import moment from 'moment';

export function DatePickerControl<T extends Entity>(props: any) {

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let type = (props.type as 'native' | 'material' | undefined) || 'native';                
                let p = {
                    ...props,
                    name: props.name || field.name,
                    format: props.format || 'L'
                };

                p.style = p.style = {};
                p.style.margin = 0;

                if (type === 'native') {
                    let value = moment(props.value || field.value).format('YYYY-MM-DD');
                    return (
                        <OutlinedInput {...p}
                            value={value}
                            onChange={(e: any) => field.onValueChanged(e.target.value, e)}
                            margin="dense" 
                            error={field.error}
                            type="date"
                            shrink={true}
                        />
                    )
                } else {
                    let value =props.value || field.value;
                    value = value === '' || value === undefined ? null : value;
                    return (
                        <DatePicker 
                            {...p}
                            value={value}
                            onChange={(date: any) => field.onValueChanged(date, undefined)}
                            inputVariant="outlined"
                            emptyLabel=""
                            invalidLabel=""
                            clearable={true}
                            invalidDateMessage={() => { return ''; }}
                            TextFieldComponent={(p: TextFieldProps) => <TextField {...p} margin="dense" />}
                        />
                    )
                }
            }
        }
        </FieldContext.Consumer>
    );
}

type DateProps<T extends Entity> = FieldProps<T> & {
    format?: string,
    type?: 'native' | 'material' | undefined
};

export function DatePickerField<T extends Entity>(props: DateProps<T>) {
    
    let p = { ...props };
    p.ControlProps = p.ControlProps || { ...props };

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, DatePickerControl);
}

// export function DatePickerListField<T extends Entity>(props: DateProps<T>) {
    
//     let p = { ...props };
//     p.ControlProps = p.ControlProps || {};
//     p.ControlProps.InputProps = p.ControlProps.InputProps || {};
//     p.ControlProps.InputProps.disableUnderline = true;
//     p.ControlProps.format = p.format;

//     return fieldWithImplementationControl(p, ListFieldImplementation, DatePickerControl);
// }
