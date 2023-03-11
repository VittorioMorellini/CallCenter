import React from 'react';
import { Field } from '../../framework/ui/form';
import { EventType } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: EventType) => x.name}  />
        <Field.Input model={(x: EventType) => x.description}  />
    </>
)