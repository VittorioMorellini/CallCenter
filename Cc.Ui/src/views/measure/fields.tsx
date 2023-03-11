import React from 'react';
import { Field } from '../../framework/ui/form';
import { Measure } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: Measure) => x.description}  />
        <Field.Input model={(x: Measure) => x.name}  />
        <Field.Input model={(x: Measure) => x.deleteUser}  />
        <Field.Date model={(x: Measure) => x.deleteDate} />
    </>
)