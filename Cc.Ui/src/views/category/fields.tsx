import React from 'react';
import { Field } from '../../framework/ui/form';
import { Category } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: Category) => x.description}  />
        <Field.Input model={(x: Category) => x.subProduct}  />
    </>
)