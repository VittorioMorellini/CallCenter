import React from 'react';
import { Field } from '../../framework/ui/form';
import { AppointmentReject } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: AppointmentReject) => x.reject}  />
    </>
)