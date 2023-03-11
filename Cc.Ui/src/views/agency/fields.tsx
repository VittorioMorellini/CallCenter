import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIdentity } from '../../app/core/hooks';
import { RootState } from '../../app/reducers';
import { useRegionActions } from '../../core/region';
import { useTabCityActions } from '../../core/tabCity';
import { useTabDistrictActions } from '../../core/tabDistrict';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { Agency, Region, RegionSearchModel, TabCity, TabCitySearchModel, TabDistrict, TabDistrictSearchModel } from '../../models';

interface Props {
    item?: Agency;
}

export default ({ item }: Props) => {
    
    const { isAdmin } = useIdentity();
    const companies = useSelector((state: RootState) => state.lookup.companies);
    const {actions: regionActions } = useRegionActions();
    //const [regions, setRegions] = useState<TabRegion[]>([]);
    const { actions: districtActions } = useTabDistrictActions();
    const [ districts, setDistricts ] = useState<TabDistrict[]>([]);    
    const { actions: cityActions } = useTabCityActions();
    const [ cities, setCities ] = useState<TabCity[]>([]);
    const [ loading, setLoading ] = useState(false);

    // useEffect(() => {
    //     regionActions.search(new RegionSearchModel())
    //         .then(res => setRegions(res))
    //         .catch(() => {});
    // }, [])

    useEffect(() => {
        districtActions.search(new TabDistrictSearchModel())
            .then(res => setDistricts(res))
            .catch(() => { });
    }, []);
    
    useEffect(() => {
        if (item != undefined && item != null) {
            const model = new TabCitySearchModel();
            if (item.cityCode){
                model.districtCode = item.provinceCode;
                cityActions.search(model)
                    .then(res => setCities(res))
                    .catch(() => { });                    
            }
        }        
    }, [])
    return (
    <>
        {isAdmin ? (
            <Field.Autocomplete 
                model={(x: Agency) => x.companyId}
                options={autocompleteOptions(companies, x => x.id, x => x.businessName)}
            />
        ) : null}
        {/* <Field.Autocomplete 
            model={(x: Agency) => x.regionId}
            options={autocompleteOptions(regions, x => x.id, x => x.description)}
        /> */}
        <Field.Input model={(x: Agency) => x.name}  />
        <Field.Input model={(x: Agency) => x.code}  />
        <Field.Autocomplete 
            model={(x: Agency) => x.provinceCode } 
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
            model={(x: Agency) => x.cityCode } 
            options={autocompleteOptions(cities, x => x.description, x => x.description)}
            ControlProps={{loading: loading, freeSolo: true }}
        />
        <Field.Input model={(x: Agency) => x.address}  />
        <Field.Input model={(x: Agency) => x.cap}  />
        <Field.Input
            model={(x: Agency) => x.mail}
            helper="Questo campo verrà utilizzato per le eventuali comunicazioni di completamento dossier, è possibile specificare più indirizzi separatati da ; (punto e virgola)."
        />
        <Field.Input model={(x: Agency) => x.vatCode}  />
    </>
    )
}