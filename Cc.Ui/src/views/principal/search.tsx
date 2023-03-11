import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { PrincipalSearchModel } from '../../models';
import { usePrincipalActions } from '../../core/principal';
import { useTranslation } from 'react-i18next';

export default (props: any) => {

    const { actions } = usePrincipalActions();
    const model = useSelector((root: RootState) => root.principal.searchModel);
    const [item, setItem] = useFormItem(model);
    const { t }  = useTranslation();

    const roles: string[] = ["SUPERADMIN", "ADMIN", "AGENT","OPERATOR","PERSON"] 

    const handler = {
        search: (x: PrincipalSearchModel) => {
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
            <Field.Input model={(x: PrincipalSearchModel) => x.surname} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalSearchModel) => x.name} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalSearchModel) => x.taxCode} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalSearchModel) => x.mail} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalSearchModel) => x.phone} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: PrincipalSearchModel) => x.username} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Autocomplete model={(x: PrincipalSearchModel) => x.role} 
                options={autocompleteOptions(roles, x => x, x => x)} 
                blank={{value: null, label: t('common:all')}} 
            />
        </SearchView>
    )
}