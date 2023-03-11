import React from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { CompanySearchModel } from '../../models';
import { useCompanyActions } from '../../core/company';

export default (props: any) => {

    const { actions } = useCompanyActions();
    const model = useSelector((root: RootState) => root.company.searchModel);
    const [item, setItem] = useFormItem(model);

    const handler = {
        search: (x: CompanySearchModel) => {
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
            <Field.Input model={(x: CompanySearchModel) => x.businessName} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CompanySearchModel) => x.vatCode} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}