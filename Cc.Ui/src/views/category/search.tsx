import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { CategorySearchModel } from '../../models';
import { useCategoryActions } from '../../core/category';

export default (props: any) => {

    const { actions } = useCategoryActions();
    const model = useSelector((root: RootState) => root.category.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: CategorySearchModel) => {
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
            <Field.Input model={(x: CategorySearchModel) => x.description} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CategorySearchModel) => x.subProduct} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}