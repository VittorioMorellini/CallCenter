import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView} from '../../framework/ui';
import { Form } from '../../framework/ui/form';
import { useFormItem, useForceUpdate, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { useConfigurationActions, useLocalConfigurationActions } from '../../core/configuration';
import {  Configuration, ConfigurationSearchModel,/*, TabCountrySearchModel*/ 
TabCountrySearchModel} from '../../models';
import Fields from './fields';
import { EntityUtils } from '../../framework/entity';
import { ListUtils } from '../../framework/utils';
import { useLanguages, useLookups } from '../../core';
import _ from 'lodash';
import { useLocalTabCountryActions } from '../../core/tabCountry';
//import { useLocalTabCountryActions } from '../../core/tabCountry';

export default (props: any) => {

    const history = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.configuration.isBusy);
    const [item, setItem] = useFormItem<Configuration>(props.item || useSelector((root: RootState) => root.configuration.currentItem));
    const { id, isUpdate } = useDetailMode(item); 
    const { actions } = useConfigurationActions();
    const forceUpdate = useForceUpdate();
    const { actions: localActions } = useLocalConfigurationActions();
    const { companies } = useLookups();
    const [globalConf, setGlobalConf] = useState<Configuration>();
    const items = useSelector((root: RootState) => root.configuration.items);
    const languages = useLanguages();
    const { actions: countryActions, state: { items: countries } } = useLocalTabCountryActions();

    useEffect(() => {

        localActions.find(0)
            .then(global => setGlobalConf(global));

        localActions.searchAll(new ConfigurationSearchModel())
            .then(list => {
                
            })

        countryActions.search(new TabCountrySearchModel());

        if (isUpdate) {
            actions.find(id).catch(() => { });
        }
    }, [id]);

    const complement = {
        companies: () => {
            if (items.length === 0)
                return [];

            return ListUtils.getComplement(
                companies,
                _.flatMap(items.filter(x => x.company !== null && x.company !== undefined), x => x.company),
                x => x.id,
                item.company
            )
        }
    }

    const handler = {
        navigateBack: () => {
            history(-1);
        },
        save: () => {
            actions.save(item)
                .then(handler.navigateBack)
                .catch(() => { })
                .finally(() => forceUpdate());
        },
        delete: () => {
            actions.delete(item.id)
                .then(handler.navigateBack)
                .catch(() => { });
        }
    };

    const content = (
        <div style={{display: 'flex'}}>
            <Form item={item} handleChange={setItem} labelWidth={180} style={{flex: 1}}>
                <Fields companies={complement.companies()} languages={languages} countries={countries} />
            </Form>
            {globalConf && item.companyId > 0 ? (
            <Form item={globalConf} handleChange={() => { EntityUtils.rollback(globalConf) }} labelWidth={180} style={{flex: 1}}>
                <Fields companies={[]} languages={languages} countries={countries} />
            </Form>) : null}
        </div>
    );

    return (
        <DetailView 
            title={t('views:configuration.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}