import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../framework/ui';
import { Form, Field } from '../../framework/ui/form';
import { useFormItem, useForceUpdate, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { useCustomerActions } from '../../core/customer';
import { Customer, CustomerRequiredField } from '../../models';
import Fields from './fields';
import { useLocalCustomerRequiredFieldActions } from '../../core/customerRequiredField';
import { useYupValidation } from '../../framework/entity/yup';
import { getCustomerValidationSchema } from '../../core/customer/validation';
import { DateUtils, ListUtils } from '../../framework/utils';
import { useConfiguration, useIdentity } from '../../app/core/hooks';
import { AppBar, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CallsView from '../customerCall/relatedModal';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.customer.isBusy);
    const [item, setItem] = useFormItem<Customer>(props.item || useSelector((root: RootState) => root.customer.currentItem));
    const { id, isUpdate } = useDetailMode(item); 
    const { actions, logger } = useCustomerActions();
    const forceUpdate = useForceUpdate();
    const { actions: customerRequiredActions } = useLocalCustomerRequiredFieldActions();
    const [requiredFields, setRequiredFields ] = useState<CustomerRequiredField>();
    const validator = useYupValidation();
    const { identity } = useIdentity();
    const [tabIndex, setTabIndex] = useState('0');
    const conf = useConfiguration();

    useEffect(() => {
        if (isUpdate) {
            actions.find(id).catch(() => { });
            // actions.getDossiers(item.companyId, item.id)
            //     .then(list => setDossiers(ListUtils.sort(list, x => x.id, true)))
            //     .catch(() => { });
        }       
        customerRequiredActions.getRequired(item?.companyId, item?.agencyId, item?.productId)
            .then(res => setRequiredFields(res));
    }, [id, ]);

    useEffect(() => {
        if (requiredFields) {
            validator.setSchema(getCustomerValidationSchema(requiredFields))
        }
    }, [requiredFields]);

    const handler = {
        navigateBack: () => {
            navigate(-1);
        },
        save: () => {
            actions.save(item, item.disabled ? undefined : validator)
            // actions.save(item)
                .then(handler.navigateBack)
                .catch(() => { })
                .finally(() => forceUpdate());
        },
        delete: () => {
            actions.delete(item.id)
                .then(handler.navigateBack)
                .catch(({ message }: any) => {
                    if (message.indexOf('REFERENCE constraint') !== -1) {
                        // sono qui perchè è scattato un controllo di integrità referenziale                        
                        logger.info(t('common:deleteConstraintWorkaround'));
                        item.disabled = DateUtils.now();
                        setItem(item);
                        handler.save();
                    }
                });
        }
    };

    const baseView = (
        <Form item={item} handleChange={setItem} validator={validator}>
            <Fields item={item} setItem={setItem} validator={validator} showDisabledField={true} />                    
        </Form>
    )
    console.log('conf', conf)
    console.log({conf})
    const content = (
        <>
            {isUpdate && item && conf.uiCustomerDetail === 'EXTENDED' ? (
            <>
                <AppBar position="static" color="transparent">
                    <Tabs
                        value={tabIndex}
                        onChange={(event, newValue) => { setTabIndex(newValue);} }
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab value={'0'} label={t('views:customer.tabs.personalData')} />
                        <Tab value={'1'} label={t('views:customer.tabs.customerCalls')} />
                    </Tabs>
                </AppBar>
                <TabContext value={tabIndex}>
                    <TabPanel value={'0'} style={{padding: 0}}>
                        {baseView}
                    </TabPanel>
                    <TabPanel value={'1'} style={{padding: 0}}>
                        <CallsView idMaster={item.id} principalId={identity.id} items={item.customerCall}/>
                    </TabPanel>
                </TabContext>
            </>
            ) : baseView}
        </>
    );

    return (
        <DetailView 
            title={t('views:customer.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}