import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { ConfigurationSearchModel } from '../../models';
import { useConfigurationActions } from '../../core/configuration';

export default (props: any) => {

    const { actions } = useConfigurationActions();
    const model = useSelector((root: RootState) => root.configuration.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: ConfigurationSearchModel) => {
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
            <Field.Input model={(x: ConfigurationSearchModel) => x.companyId} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}