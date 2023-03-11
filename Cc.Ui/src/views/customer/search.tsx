import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { CustomerSearchModel, TabCity, TabCitySearchModel } from '../../models';
import { useCustomerActions } from '../../core/customer';
import { useIdentity } from '../../app/core/hooks';
import { useTranslation } from 'react-i18next';
import { useIdentityDocument, useSexType } from '../../core';
import { useTabCityActions } from '../../core/tabCity';

class typeCustomer {
    type: number;
    description: string;
       
    constructor(id: number, description: string)
    {
        this.type=id;
        this.description = description;
    }
}
export default (props: any) => {

    const { actions } = useCustomerActions();
    const model = useSelector((root: RootState) => root.customer.searchModel);
    const [item, setItem] = useFormItem(model);
    const { t }  = useTranslation();
    const sexs = useSexType();
    const { countries, districts } = useSelector((root: RootState) => root.lookup);
    const [ birthCities, setBirthCities ] = useState<TabCity[]>([]);
    const { actions: cityActions } = useTabCityActions();
    const [ loading, setLoading ] = useState(false);
    const identityDocuments = useIdentityDocument();

    const types: typeCustomer[] = [new typeCustomer(0, t("common:customer")), new typeCustomer(1, t("common:internal"))] 
    const handler = {
        search: (x: CustomerSearchModel) => {
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
            <Field.Autocomplete model={(x: CustomerSearchModel) => x.type}
                options={autocompleteOptions(types, x => x.type, x => x.description)} 
                blank={{value: null, label: t('common:all')}} 
            />
            <Field.Input model={(x: CustomerSearchModel) => x.firstName} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CustomerSearchModel) => x.lastName} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CustomerSearchModel) => x.taxCode} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Autocomplete model={(x: CustomerSearchModel) => x.sex}
                options={autocompleteOptions(sexs, x => x.value, x => x.label)} 
                blank={{value: null, label: t('common:all')}} 
            />
            <Field.Input model={(x: CustomerSearchModel) => x.phone} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: CustomerSearchModel) => x.mail} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: CustomerSearchModel) => x.birthDate} />
            <Field.Autocomplete model={(x: CustomerSearchModel) => x.country}
                options={autocompleteOptions(countries, x => x.code, x => x.localName ?? x.name)} 
                blank={{value: null, label: t('common:all')}} 
            />
            <Field.Autocomplete 
                model={(x: CustomerSearchModel) => x.districtId } 
                options={autocompleteOptions(districts, x => x.code, x => x.description)}
                onValueChanged={(value: any) => {
                    // Api call
                    setLoading(true);
                    setBirthCities([]);
                    item!.city = '';
                    const model = new TabCitySearchModel();
                    model.districtCode = value;
                    cityActions.search(model)
                        .then(res => {
                            setBirthCities(res);
                        })
                        .catch(() => { })
                        .finally(() => {
                            setLoading(false);
                        })
                }}
            />            
            <Field.Autocomplete 
                model={(x: CustomerSearchModel) => x.city } 
                options={autocompleteOptions(birthCities, x => x.description, x => x.description)}
                ControlProps={{loading: loading, freeSolo: true }}
            />
            <Field.Autocomplete 
                model={(x: CustomerSearchModel) => x.identificationDocType } 
                options={autocompleteOptions(identityDocuments, x => x.value, x => x.label)}
            />
            <Field.Input model={(x: CustomerSearchModel) => x.identificationDocNumber} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Date model={(x: CustomerSearchModel) => x.identificationDocReleaseDate} />
            <Field.Date model={(x: CustomerSearchModel) => x.identificationDocExpirationDate} />
        </SearchView>
    )
}