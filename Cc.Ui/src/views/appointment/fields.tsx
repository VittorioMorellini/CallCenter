import React from 'react';
import { Field } from '../../framework/ui/form';
import { Appointment } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: Appointment) => x.eventId}  />
        <Field.Input model={(x: Appointment) => x.appointmentTypeId}  />
        <Field.Input model={(x: Appointment) => x.appointmentEndingId}  />
        <Field.Input model={(x: Appointment) => x.motivation}  />
        <Field.Input model={(x: Appointment) => x.salesmanId}  />
        <Field.Input model={(x: Appointment) => x.customerId}  />
        <Field.Input model={(x: Appointment) => x.district}  />
        <Field.Input model={(x: Appointment) => x.productId}  />
        <Field.Date model={(x: Appointment) => x.dateFrom} />
        <Field.Date model={(x: Appointment) => x.dateTo} />
        <Field.Input model={(x: Appointment) => x.state}  />
    </>
)