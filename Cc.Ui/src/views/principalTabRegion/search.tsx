import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { PrincipalTabRegionSearchModel } from '../../models';
import { usePrincipalTabRegionActions } from '../../core/principalTabRegion';

export default (props: any) => {

    const { actions } = usePrincipalTabRegionActions();
    const model = useSelector((root: RootState) => root.principalTabRegion.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: PrincipalTabRegionSearchModel) => {
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
            <Field.Input model={(x: PrincipalTabRegionSearchModel) => x.principalId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalTabRegionSearchModel) => x.tabRegionId} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}