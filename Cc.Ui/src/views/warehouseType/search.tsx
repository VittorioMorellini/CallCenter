import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { WarehouseTypeSearchModel } from '../../models';
import { useWarehouseTypeActions } from '../../core/warehouseType';

export default (props: any) => {

    const { actions } = useWarehouseTypeActions();
    const model = useSelector((root: RootState) => root.warehouseType.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: WarehouseTypeSearchModel) => {
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
            <Field.Input model={(x: WarehouseTypeSearchModel) => x.name} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}