import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormItem } from '../../framework/hooks';
import { SearchView } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { RootState } from '../../app/reducers';
import { AgencySearchModel } from '../../models';
import { useAgencyActions } from '../../core/agency';
import { useIdentity } from '../../app/core/hooks';
import { useTranslation } from 'react-i18next';
//import { useTabCityActions } from '../../core/tabCity';

export default (props: any): JSX.Element => {

    const { actions } = useAgencyActions();
    const model = useSelector((root: RootState) => root.agency.searchModel);
    const [item, setItem] = useFormItem(model);
    const { isAdmin } = useIdentity();
    const companies = useSelector((state: RootState) => state.lookup.companies);
    const { t }  = useTranslation();
    //const { countries, districts } = useSelector((root: RootState) => root.lookup);
    //const [ cities, setCities ] = useState<TabCity[]>([]);
    //const { actions: cityActions } = useTabCityActions();
    const [ loading, setLoading ] = useState(false);

    const handler = {
        search: (x: AgencySearchModel) => {
            return actions.search(x).catch(() => { });
        },
        keyPress: (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handler.search(item)
            }
        }
    }

    // useEffect(() => {        
    //     if (!item.provinceCode)
    //          return;
        
    //     const model = new TabCitySearchModel();
    //     model.districtCode = item.provinceCode;
    //     cityActions.search(model)
    //         .then(res => {
    //             setCities(res);
    //         })
    //         .catch(() => { })
    //         .finally(() => {
    //             setLoading(false);
    //         })
    // }, []);
    
    return (
        <SearchView 
            item={item} 
            setItem={setItem}
            onSearch={handler.search}
        >
            {/*isSuperAdmin ? (
                <Field.Autocomplete model={(x: AgencySearchModel) => x.companyId} 
                    options={autocompleteOptions(companies, x => x.id, x => x.businessName)} 
                    blank={{value: null, label: t('common:allCompany')}} 
                />
            ) : null
            */}
            <Field.Input model={(x: AgencySearchModel) => x.name} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AgencySearchModel) => x.code} ControlProps={{onKeyPress: handler.keyPress}} />
            {/*
            <Field.Autocomplete 
                model={(x: AgencySearchModel) => x.provinceCode } 
                options={autocompleteOptions(districts, x => x.code, x => x.description)}
                onValueChanged={(value: any) => {
                    // Api call
                    setLoading(true);
                    setCities([]);
                    item!.cityCode = '';
                    const model = new TabCitySearchModel();
                    model.districtCode = value;
                    cityActions.search(model)
                        .then(res => {
                            setCities(res);
                        })
                        .catch(() => { })
                        .finally(() => {
                            setLoading(false);
                        })
                }}
            />            
            <Field.Autocomplete 
                model={(x: AgencySearchModel) => x.cityCode } 
                options={autocompleteOptions(cities, x => x.description, x => x.description)}
                ControlProps={{loading: loading, freeSolo: true }}
            />
            */}
            <Field.Input model={(x: AgencySearchModel) => x.address} ControlProps={{onKeyPress: handler.keyPress}} />
            <Field.Input model={(x: AgencySearchModel) => x.cap} ControlProps={{onKeyPress: handler.keyPress}} />
        </SearchView>
    )
}