import React from 'react';
import { Field } from '../../framework/ui/form';
import { AppointmentEnding } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: AppointmentEnding) => x.outcome}  />
        <Field.Input model={(x: AppointmentEnding) => x.color}  />
    </>
)