import { MaterialField as MaterialField2, ListField as ListField2, FieldGroup, FieldRow } from './field';
import { InputField, InputListField, InputOutlinedField } from './controls/input';
import { AutocompleteOutlinedField, AutocompleteField, autocompleteOptions } from './controls/autocomplete';
import { AutocompleteMultipleOutlinedField, AutocompleteMultipleField } from './controls/autocompleteMultiple';
import { DatePickerField } from './controls/date';
// import { CheckboxField } from './controls/checkbox';
import { SwitchField } from './controls/switch';
import { RadioField, radioOptions } from './controls/radio';
import { FileDownloadField }  from './controls/fileDownload';
import { FileUploadField }  from './controls/fileUpload';
import { ImageUploadField }  from './controls/imageUpload';
import { ColorField, ColorOutlinedField }  from './controls/color';

// import { SelectField, SelectListField, selectOptions } from './controls/select';


export { Form } from '../../form';
export { FieldGroup, autocompleteOptions, radioOptions /*selectOptions, radioOptions*/ };

export const Field = {
    Input: InputOutlinedField,
    Autocomplete: AutocompleteOutlinedField,
    AutocompleteMultiple: AutocompleteMultipleOutlinedField,
    Date: DatePickerField,
    FileDownload: FileDownloadField,
    FileUpload: FileUploadField,
    ImageUpload: ImageUploadField,
    // Checkbox: CheckboxField,
    Switch: SwitchField,
    Radio: RadioField,
    Color: ColorOutlinedField,
    Row: FieldRow,
    Group: FieldGroup
}

export const MaterialField = {
    Input: InputField,
    Autocomplete: AutocompleteField,
    AutocompleteMultiple: AutocompleteMultipleField,
    Date: DatePickerField,
    FileDownload: FileDownloadField,
    FileUpload: FileUploadField,
    ImageUpload: ImageUploadField,
    // Checkbox: CheckboxField,
    Switch: SwitchField,
    Radio: RadioField,
    Color: ColorField,
    Row: FieldRow,
    Group: FieldGroup
}