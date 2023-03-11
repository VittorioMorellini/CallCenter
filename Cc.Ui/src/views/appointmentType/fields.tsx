import React from 'react';
import { Field } from '../../framework/ui/form';
import { AppointmentType } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: AppointmentType) => x.type}  />
        <Field.Input model={(x: AppointmentType) => x.page}  />
        <Field.Input model={(x: AppointmentType) => x.role}  />
    </>
)