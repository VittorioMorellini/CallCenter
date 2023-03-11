import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { WarehouseSearchModel } from '../../models';
import { useWarehouseActions } from '../../core/warehouse';

export default (props: any) => {

    const { actions } = useWarehouseActions();
    const model = useSelector((root: RootState) => root.warehouse.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: WarehouseSearchModel) => {
            return actions.search(x).catch(() => { });
        },
        keyPress: (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handler.search(item)
            }
        }
    }

    return (
        <SearchView 
            item={item} 
            setItem={setItem}
            onSearch={handler.search}
        >
            <Field.Input model={(x: WarehouseSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: WarehouseSearchModel) => x.salesmanId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: WarehouseSearchModel) => x.warehouseTypeId} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}