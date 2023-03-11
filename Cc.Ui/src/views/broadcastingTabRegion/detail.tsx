import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../framework/ui';
import { Form, Field } from '../../framework/ui/form';
import { useFormItem, useForceUpdate, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { useBroadcastingTabRegionActions } from '../../core/broadcastingTabRegion';
import { BroadcastingTabRegion } from '../../models';
import Fields from './fields';
import { useLookups } from '../../core';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.broadcastingTabRegion.isBusy);
    const [item, setItem] = useFormItem<BroadcastingTabRegion>(props.item || useSelector((root: RootState) => root.broadcastingTabRegion.currentItem));
    const { id, isUpdate } = useDetailMode(item); 
    const { actions } = useBroadcastingTabRegionActions();
    const {regions} = useLookups();
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
                <Fields regions={regions} />
            </Form>
        </Panel>
    );

    return (
        <DetailView 
            title={t('views:broadcastingTabRegion.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}