import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../framework/ui';
import { Form, Field } from '../../framework/ui/form';
import { useFormItem, useForceUpdate, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { useCompanyActions } from '../../core/company';
import { Company } from '../../models';
import Fields from './fields';

export default (props: any) => {

    const history = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.company.isBusy);
    const [item, setItem] = useFormItem<Company>(props.item || useSelector((root: RootState) => root.company.currentItem));
    const { id, isUpdate } = useDetailMode(item); 
    const { actions } = useCompanyActions();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (isUpdate) {
            actions.find(id).catch(() => { });
        }
    }, [id]);

    const handler = {
        navigateBack: () => {
            history(-1);
        },
        save: () => {
            actions.save(item)
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
        <>
            <Form item={item} handleChange={setItem}>
                <Fields />
            </Form>
            
        </>
    );

    return (
        <DetailView  
            title={t('views:company.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}