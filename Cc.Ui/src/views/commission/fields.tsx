import React from 'react';
import { Field } from '../../framework/ui/form';
import { Commission } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: Commission) => x.description}  />
        <Field.Input model={(x: Commission) => x.percentage}  />
    </>
)