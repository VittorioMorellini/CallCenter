import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTopCountryMode } from '../../app/core/hooks';
import { RootState } from '../../app/reducers';
import { useIdentityDocument, useLookups, useSexType } from '../../core';
import { useTabCityActions } from '../../core/tabCity';
import { YupValidator } from '../../framework/entity';
import { Panel } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { autocompleteOptions } from '../../framework/ui/form/controls/autocomplete';
import { DateUtils } from '../../framework/utils';
import { Customer, TabCity, TabCitySearchModel } from '../../models';

interface Props {
    item: Customer;
    setItem: (obj: Customer) => void;
    validator?: YupValidator;
    showDisabledField?: boolean;  
}

export default ({ item, validator, showDisabledField }: Props) => {

    const { t } = useTranslation();
    const sexes = useSexType();
    const identityDocuments = useIdentityDocument();
    const { ITALY_CODE, isIso2 } = useTopCountryMode();
    const [ birthCities, setBirthCities ] = useState<TabCity[]>([]);
    const [ resCities, setResCities ] = useState<TabCity[]>([]);
    const [ identiCities, setIdentiCities ] = useState<TabCity[]>([]);
    const { actions: cityActions } = useTabCityActions();
    const { countries, districts, products, broadcastings} = useSelector((root: RootState) => root.lookup);
    const [isForeignBirth, setForeignBirth] = useState<boolean>(item?.country !== ITALY_CODE);
    const [isForeignIdent, setForeignIdent] = useState<boolean>(item?.identificationDocCountry !== ITALY_CODE);
        
    const loadBirth = async () => {
        if (item && item.districtId) {
            let model = new TabCitySearchModel();
            model.districtId = item.districtId;
            let res = await cityActions.search(model)
            setBirthCities(res);
        }
    }
        
    useEffect(() => {

        Promise.all([
            loadBirth(),
        ])
        
        if (item && item.identificationDocCountry !== ITALY_CODE)
            setForeignIdent(true);
    }, [item])

    useEffect(() => {

        let z = birthCities.find(x => x.description === item.city);
        
    }, [item.city, birthCities])

    if (!item) {
        return null;
    }
    
    return (
    <>
        {/* <Field.Input model={(x: Customer) => x.companyId} />
        <Field.Input model={(x: Customer) => x.agencyId} />
        <Field.Input model={(x: Customer) => x.type} /> */}
        <Panel title={t('views:customer.detail.personal')}>
            <Field.Input model={(x: Customer) => x.firstName} />
            <Field.Input model={(x: Customer) => x.lastName} />
            <Field.Input model={(x: Customer) => x.taxCode} />
            <Field.Autocomplete 
                model={(x: Customer) => x.sex } 
                options={autocompleteOptions(sexes, x => x.value, x => x.label)}
            />
            <Field.Input model={(x: Customer) => x.phone} />
            <Field.Input model={(x: Customer) => x.mobilePhone} />
            <Field.Input model={(x: Customer) => x.mail} />
            <Field.Autocomplete 
                model={(x: Customer) => x.country } 
                options={autocompleteOptions(countries, x => isIso2 ? x.iso2Code : x.code, x => x.localName ?? x.name)}
                onValueChanged={(value: any) => {
                    setBirthCities([]);
                    if (value !== ITALY_CODE) {
                        item.districtId = null;
                        item.city = '';
                        setForeignBirth(true);
                    }
                    else {
                        item.districtId = null;
                        setForeignBirth(false);
                    }
                }}
            />
            <Field.Autocomplete 
                model={(x: Customer) => x.districtId } 
                options={autocompleteOptions(districts, x => x.id, x => x.description)}
                hidden={item.country !== null && item.country !== undefined && item.country !== ITALY_CODE}
                onValueChanged={(value: any) => {
                    setBirthCities([]);
                    item.city = '';
                    const model = new TabCitySearchModel();
                    model.districtId = value;
                    cityActions.search(model)
                        .then(res => {
                            setBirthCities(res);
                        })
                        .catch(() => { })
                }}
            />            
            {isForeignBirth ? (
                <Field.Input model={(x: Customer) => x.city} />
            ) :
            <> 
            {!item.city || birthCities.findIndex(z => z.description === item.city) > -1 ?
                <Field.Autocomplete 
                    model={(x: Customer) => x.city } 
                    options={autocompleteOptions(birthCities, x => x.description, x => x.description)}
                    ControlProps={{freeSolo: true}}
                />
            :
                <Field.Input model={(x: Customer) => x.city} />
            }
            <Field.Input model={(x: Customer) => x.address} />
            <Field.Input model={(x: Customer) => x.addressNumber} />
            <Field.Input model={(x: Customer) => x.vatCode} />
            <Field.Date model={(x: Customer) => x.birthDate} />
            <Field.Date model={(x: Customer) => x.contactDate} />
            <Field.Date model={(x: Customer) => x.recallDate} />
            {showDisabledField ?
            <Field.Switch
                model={(x: Customer) => x.disabled}
                onGetValue={(x => x ? true : false)}
                onSetValue={(x => x ? DateUtils.now() : undefined)}
            /> : null}
            </>
            }
        </Panel>
        <Panel title={t('views:customer.detail.identification')}>
            <Field.Autocomplete 
                model={(x: Customer) => x.identificationDocType } 
                options={autocompleteOptions(identityDocuments, x => x.value, x => x.label)}
            />
            <Field.Input model={(x: Customer) => x.identificationDocNumber} />
            <Field.Autocomplete 
                model={(x: Customer) => x.identificationDocCountry } 
                options={autocompleteOptions(countries, x => isIso2 ? x.iso2Code : x.code, x => x.localName ?? x.name)}
            />
            <Field.Date model={(x: Customer) => x.identificationDocReleaseDate} />
            <Field.Date model={(x: Customer) => x.identificationDocExpirationDate} />
        </Panel>
        <Panel title={t('views:customer.detail.product')}>
            <Field.Autocomplete 
                model={(x: Customer) => x.productId } 
                options={autocompleteOptions(products, x => x.id, x => x.description)}
            />
        </Panel>
        <Panel title={t('views:customer.detail.broadcasting')}>
            <Field.Autocomplete 
                model={(x: Customer) => x.broadcastingId } 
                options={autocompleteOptions(broadcastings, x => x.id, x => x.name)}
            />
        </Panel>
    </>
    )
}