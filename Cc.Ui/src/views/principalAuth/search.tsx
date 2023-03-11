import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { PrincipalAuthSearchModel } from '../../models';
import { usePrincipalAuthActions } from '../../core/principalAuth';

export default (props: any) => {

    const { actions } = usePrincipalAuthActions();
    const model = useSelector((root: RootState) => root.principalAuth.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: PrincipalAuthSearchModel) => {
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
            <Field.Input model={(x: PrincipalAuthSearchModel) => x.principalId} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalAuthSearchModel) => x.agencyId} ControlProps={{onKeyPress: handler.keyPress}} />
            {/* <Field.Input model={(x: PrincipalAuthSearchModel) => x.userPath} ControlProps={{onKeyPress: handler.keyPress}} /> */}
        </SearchView>
    )
}