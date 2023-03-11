import moment from 'moment';
import * as yup from 'yup';
import { createSchema } from '../../framework/entity/yup';
//import CodiceFiscale  from 'codice-fiscale-js';
import { CodiceFiscale }  from '../../framework/utils/codiceFiscale';
import { Customer, CustomerRequiredField } from '../../models';
import i18next from 'i18next';

const defaultSchema = () => createSchema<Customer>([
    // mandatory: questi campi devono sempre essere obbligatori a dispetto di quello definito nel CustomerRequiredField
    [x => x.firstName, yup.string().required().matches(/.{0,25}/)],
    [x => x.lastName, yup.string().required().matches(/.{0,25}/)],
    [x => x.mobilePhone, yup.string().required()],
    [x => x.mail, yup.string().required().email()],
    // optional
    [x => x.sex, yup.string().nullable().matches(/^f|m|F|M$/)],
    //[x => x.birthProvince, yup.string().nullable().matches(/^[A-Z]{0,2}$/)],
    [x => x.city, yup.string().nullable().matches(/[\p{L}\-'.,_0-9/\s]{0,50}/)],
    [x => x.address, yup.string().required()],
    [x => x.identificationDocType, yup.string().nullable().matches(/AL|CI|PA|PD|PN|PS|PT/)],
    [x => x.identificationDocNumber, yup.string().nullable().matches(/^[a-zA-Z0-9]{0,40}$/)],
    [x => x.identificationDocCountry, yup.string().nullable().matches(/^[A-Z]{0,3}$/)],
    [x => x.identificationDocReleaseDate, yup.date().nullable().test('docReleaseDateValidation', i18next.t('entities:customer.docReleaseInvalidDate'), (value, context) => {
        
        let item = context.parent as Customer;
        if (!item || !value) {
            return true;
        }
    
        let today = moment().unix()
        let releaseDate = moment(value).unix()
    
        console.debug('docReleaseDateValidation', today, releaseDate)
        if (releaseDate >= today) {
            return false;
        }

        if (item.identificationDocExpirationDate) {
            let expirationDate = moment(item.identificationDocExpirationDate).unix()
            if (expirationDate <= releaseDate) {
                return false;
            }
        }

        return true;
    })],
    [x => x.identificationDocExpirationDate, yup.date().nullable().test('docExpirationDateValidation', i18next.t('entities:customer.docExpirationInvalidDate'), (value, context) => {
        
        let item = context.parent as Customer;
        if (!item || !value) {
            return true;
        }
    
        let today = moment().unix()
        let expirationDate = moment(value).unix()
    
        console.debug('docExpirationDateValidation', today, expirationDate)
        if (expirationDate <= today) {
            return false;
        }

        if (item.identificationDocReleaseDate) {
            let releaseDate = moment(item.identificationDocReleaseDate).unix()
            if (expirationDate <= releaseDate) {
                return false;
            }
        }

        return true;
    })]
])

const baseSchema = () => createSchema<Customer>([
    [x => x.firstName, yup.string().required()],
    [x => x.lastName, yup.string().required()],
    [x => x.sex, yup.string().required()],
    [x => x.mobilePhone, yup.string().required()],
    [x => x.mail, yup.string().required()],
    [x => x.address, yup.string().required()],
    [x => x.taxCode, yup.string().nullable().test('taxCodeValidation', i18next.t('entities:customer.invalidTaxCode'), (value, context) => {
        
        let item = context.parent as Customer;
        if (!item || !item.taxCode || !item.birthDate || !item.city  || !item.firstName || !item.lastName || !item.sex ) {
            return true;
        }


        let isValid = true;
        let birthDate = moment(item.birthDate, 'YYYY-MM-DD');
        let day = birthDate.format('DD');
        let month = birthDate.format('MM');
        let year = birthDate.format('YYYY');
        
        // const cf = new CodiceFiscale({
        //     name: item.firstName,
        //     surname: item.lastName,
        //     gender: item.sex,
        //     day,
        //     month,
        //     year,
        //     birthplace: item.city, 
        // });
    
        // if (!cf.isValid()) {
        //     console.debug('Computed tax code is invalid');
        //     isValid = false;
        // }

        // if (cf.toString() !== item.taxCode.toUpperCase()) {
        //     console.debug(`Computed tax code ${cf.toString()} is different from provided ${item.taxCode.toUpperCase()}`);
        //     isValid = false;
        // }  
          
        return isValid;
    })],
])

const birthSchema = () => createSchema<Customer>([
    [x => x.birthDate, yup.date().required()],
    [x => x.city, yup.string().required()],
    [x => x.country, yup.string().required()],
    [x => x.mail, yup.string().required()],
])

// const identificationSchema = () => createSchema<Customer>([
//     [x => x.identificationDocType, yup.string().required()],
//     [x => x.identificationDocNumber, yup.string().required()],
//     [x => x.identificationDocCountry, yup.string().required()],
//     [x => x.identificationDocReleaseDate, yup.date().required()],
//     [x => x.identificationDocExpirationDate, yup.date().required()]
// ]);

export function getCustomerValidationSchema(customerRequiredField?: CustomerRequiredField) {

    let schema = defaultSchema();

    if (customerRequiredField) {
    
        if (customerRequiredField.base) {
            schema = schema.concat(baseSchema());
            //non so come recuperare il code opprtuno e li considero entrambi
            // if (!citizenship || citizenship === 'I' || citizenship === 'IT') {
            //         schema = schema.concat(createSchema<Customer>([
            //         [x => x.taxCode, yup.string().required()]
            //     ]))
            // }
        }
    
        if (customerRequiredField.birth) {
            schema = schema.concat(birthSchema());
        }
        
        // if (customerRequiredField.identification) {
        //     schema = schema.concat(identificationSchema());
        // }

        // if (customerRequiredField.custom) {
        //     let list: string[] = customerRequiredField.fields ? JSON.parse(customerRequiredField.fields) : [];
        //     schema = schema.concat(dynamicSchema(list));
        // }      
    }

    return schema;
}

const dynamicSchema = (fields: string[]) => {

    const validationObject: { [key: string]: yup.AnySchema } = {}

    fields.forEach((field) => {
        if (field.indexOf('date') > -1) {
            validationObject[field] = yup.date().required()
        } else {
            validationObject[field] = yup.string().required()
        }
    })
   
    return yup.object(validationObject);

    // let schema =  yup.object().shape(validationObject);
    // console.debug('Schema', schema);
    // return schema;
}