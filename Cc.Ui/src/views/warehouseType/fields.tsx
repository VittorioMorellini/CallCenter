import React from 'react';
import { Field } from '../../framework/ui/form';
import { WarehouseType } from '../../models';

export default () => (
    <>
        <Field.Input model={(x: WarehouseType) => x.name}  />
    </>
)