import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../framework/ui';
import { Form, Field } from '../../framework/ui/form';
import { useFormItem, useForceUpdate, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { useWarehouseActions } from '../../core/warehouse';
import { Warehouse } from '../../models';
import Fields from './fields';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.warehouse.isBusy);
    const [item, setItem] = useFormItem<Warehouse>(props.item || useSelector((root: RootState) => root.warehouse.currentItem));
    const { id, isUpdate } = useDetailMode(item); 
    const { actions } = useWarehouseActions();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (isUpdate) {
            actions.find(id).catch(() => { });
        }
    }, [id]);

    const handler = {
        navigateBack: () => {
            navigate(-1);
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
        <Panel>
            <Form item={item} handleChange={setItem}>
                <Fields />
            </Form>
        </Panel>
    );

    return (
        <DetailView 
            title={t('views:warehouse.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}