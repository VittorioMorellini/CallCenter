import React from 'react';
import { Field } from '../../framework/ui/form';
import { CustomerCall } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: CustomerCall) => x.description}  />
        {/* <Field.Input model={(x: CustomerCall) => x.principalId}  /> */}
        {/* <Field.Input model={(x: CustomerCall) => x.customerId}  /> */}
        <Field.Date model={(x: CustomerCall) => x.callDate} />
    </>
)