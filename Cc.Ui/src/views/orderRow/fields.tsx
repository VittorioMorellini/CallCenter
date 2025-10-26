import React from 'react';
import { Field } from '../../framework/ui/form';
import { OrderRow } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: OrderRow) => x.orderId}  />
        <Field.Input model={(x: OrderRow) => x.productId}  />
        <Field.Input model={(x: OrderRow) => x.quantity}  />
        <Field.Input model={(x: OrderRow) => x.measureId}  />
        <Field.Input model={(x: OrderRow) => x.warehouseId}  />
        <Field.Input model={(x: OrderRow) => x.registrationNumber}  />
    </>
)