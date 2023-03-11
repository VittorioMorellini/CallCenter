import { Dispatch, SetStateAction, useCallback,  useState } from 'react';
import * as yup from 'yup';
import { PropertyUtils } from '../utils';

export type YupValidator = {
    validate: (item: any, alternativeSchema?: yup.AnySchema, validationFailedCallback?: () => void) => boolean;
    validateAsync: (item: any, alternativeSchema?: yup.AnySchema, validationFailedCallback?: () => void) => Promise<any | yup.ValidationError>;
    validateField: (item: any, fieldName: string, alternativeSchema?: yup.AnySchema, validationFailedCallback?: () => void) => boolean;
    isFieldRequired: (fieldName: string) => boolean;
    getFieldErrorMessage: (fieldName: string) => string | undefined;
    isItemInError: (item: any) => boolean;
    isFieldInError: (item: any, fieldName: string) => boolean;
    schema: yup.AnySchema;
    setSchema: Dispatch<SetStateAction<yup.ObjectSchema<any, Record<string, any>, any, any>>>;
    errors: yup.ValidationError;
}

export function useYupValidation<T>(schemaDef?: yup.ObjectSchema<any> | [(item: T) => any | string, yup.AnySchema][]) {

    if (!schemaDef)
        schemaDef = yup.object();

    if (Array.isArray(schemaDef)) {
        schemaDef = createSchema(schemaDef as [(item: T) => any | string, yup.AnySchema][]);
    }

    const [schema, setSchema] = useState<yup.ObjectSchema<any>>(schemaDef as yup.ObjectSchema<any>);
    const [errors, setErrors] = useState<yup.ValidationError>();

    const isFieldRequired = useCallback((name: string) => {

        const fieldValidationSchema = schema.describe().fields[name];
        const tests = fieldValidationSchema ? (fieldValidationSchema as any).tests : false;
        const isRequired = tests ? !!tests.find((test: { name: string; }) => test.name === 'required') : false;
    
        return isRequired;
    }, [schema]);

    const getFieldErrorMessage = useCallback((name: string) => {

        let errorMessage = undefined;
        if (errors && errors.inner) {
            let fieldError = errors.inner.find(x => x.path === name);
            errorMessage = fieldError?.message;
        }

        return errorMessage;
    }, [errors])

    const isItemInError = useCallback((item: any) => {

        let errors = item['__errors'] as yup.ValidationError;
        return errors !== undefined;
    }, [])

    const isFieldInError = useCallback((item: any, name: string) => {

        let errors = item['__errors'] as yup.ValidationError;
        if (errors && errors.inner) {
            let fieldError = errors.inner.find(x => x.path === name);
            return fieldError !== undefined;
        }

        return false;
    }, [])

    const validate = (item: any, alternativeSchema?: yup.AnySchema, validationFailedCallback?: () => void) => {

        let sk = alternativeSchema || schema;
        try {
            //item['__errors'] = undefined;
            delete item.__errors;
            sk.validateSync(item, { abortEarly: false, context: item });
            setErrors(undefined);
            return true;
        } catch (err: any) {
            item['__errors'] = err;
            console.debug(err, err.inner);
            if (validationFailedCallback) {
                validationFailedCallback();
            }
            setErrors(err);
            return false;
        }
    }

    const validateAsync = async (item: any, alternativeSchema?: yup.AnySchema, validationFailedCallback?: () => void)=> {

        let sk = alternativeSchema || schema;
        try {
            //item['__errors'] = undefined;
            delete item.__errors;
            const obj = await sk.validate(item, { abortEarly: false, context: item });
            setErrors(undefined);
            return obj;
        } catch (error: any) {
            item['__errors'] = error;
            console.debug(error, error.inner);
            if (validationFailedCallback) {
                validationFailedCallback();
            }
            setErrors(error);
            return error;
        }
    }

    const validateField = (item: any, fieldName: string, alternativeSchema?: yup.AnySchema, validationFailedCallback?: () => void) => {

        let sk = alternativeSchema || schema;
        try {

            // if (errors) {
            //     let index = errors.inner.findIndex(x => x.path === fieldName);
            //     if (index > -1) {
            //         console.debug(`${fieldName}: clean`);
            //         errors.inner = errors.inner.splice(index, 1);
            //     }
            //     setErrors(errors);
            // }
            setErrors(undefined);
            const fieldValidationSchema = schema.describe().fields[fieldName];
            if (fieldValidationSchema) {
                yup.reach(sk, fieldName).validateSync(item[fieldName])
            }
            return true;
        } catch (err: any) {
            // err.path = fieldName;
            // let ee = errors ?? new yup.ValidationError(err);
            // ee.inner = [...ee.inner, err];
            // item['__errors'] = ee;
            // console.debug(`${fieldName}: error`, ee.inner);
            err.path = fieldName;
            err.inner = [err];
            item['__errors'] = err;
            if (validationFailedCallback) {
                validationFailedCallback();
            }
            setErrors(err);
            return false;
        }
    }

    return {
        validate,
        validateAsync,
        validateField,
        isFieldRequired,
        getFieldErrorMessage,
        isItemInError,
        isFieldInError,
        schema,
        setSchema,
        errors
    } as YupValidator
}

export function createSchema<T>(fieldsSchema: [(item: T) => any | string, yup.AnySchema][]) {

    let obj: any = { }
    fieldsSchema.map(x => {
        let name = typeof x[0] === 'string' ? x[0] : PropertyUtils.propertyName<T, keyof T>(x[0]);
        obj[name] = x[1]
    })
    
    return yup.object().shape(obj);
}

export function createFieldsRequiredSchema(fields: string[]) {

    let obj: any = { }
    fields.map(x => {
        obj[x] = yup.mixed().required()
    })

    return obj;
}