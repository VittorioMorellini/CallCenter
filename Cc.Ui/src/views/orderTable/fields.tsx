import React from 'react';
import { Field } from '../../framework/ui/form';
import { OrderTable } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: OrderTable) => x.appointmentId}  />
        <Field.Input model={(x: OrderTable) => x.totalAmount}  />
        <Field.Input model={(x: OrderTable) => x.vatId}  />
        <Field.Input model={(x: OrderTable) => x.netAmount}  />
        <Field.Input model={(x: OrderTable) => x.commissionId}  />
        <Field.Input model={(x: OrderTable) => x.commissionAmount}  />
        <Field.Input model={(x: OrderTable) => x.orderStateId}  />
        <Field.Input model={(x: OrderTable) => x.notes}  />
        <Field.Input model={(x: OrderTable) => x.date}  />
        <Field.Input model={(x: OrderTable) => x.invoiceDate}  />
        <Field.Input model={(x: OrderTable) => x.invoiceNumber}  />
        <Field.Input model={(x: OrderTable) => x.taxcode}  />
        <Field.Input model={(x: OrderTable) => x.accountholder}  />
        <Field.Input model={(x: OrderTable) => x.vatcode}  />
        <Field.Input model={(x: OrderTable) => x.deposit}  />
        <Field.Input model={(x: OrderTable) => x.balance}  />
    </>
)