import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { ProductSearchModel } from '../../models';
import { useProductActions } from '../../core/product';

export default (props: any) => {

    const { actions } = useProductActions();
    const model = useSelector((root: RootState) => root.product.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: ProductSearchModel) => {
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
            <Field.Input model={(x: ProductSearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: ProductSearchModel) => x.price} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: ProductSearchModel) => x.code} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: ProductSearchModel) => x.companyId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: ProductSearchModel) => x.categoryId} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}