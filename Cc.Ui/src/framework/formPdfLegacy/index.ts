import Form from './form';
import Page from './page';
import { InputField } from './controls/input';
import { CheckboxField } from './controls/checkbox';
import { DateField } from './controls/date';
import { SelectField, selectOptions } from './controls/select';

// export { Form, Page, selectOptions };
// export { FieldDefinition, FieldConfig } from './utils';
export { Form as PdfForm, Page as PdfPage };
// export type { FieldDefinition as PdfFieldDefinition, FieldConfig as FieldConfig } from './utils';
export const PdfField = {
    Input: InputField,
    Date: DateField,    
    Select: SelectField,
    Checkbox: CheckboxField
}