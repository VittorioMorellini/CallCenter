import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../framework/ui';
import { Form, Field } from '../../framework/ui/form';
import { useFormItem, useForceUpdate, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { useAgencyActions } from '../../core/agency';
import { Agency } from '../../models';
import Fields from './fields';

export default (props: any): JSX.Element => {

    const history = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.agency.isBusy);
    const [item, setItem] = useFormItem<Agency>(props.item || useSelector((root: RootState) => root.agency.currentItem));
    const { id, isUpdate } = useDetailMode(item); 
    const { actions } = useAgencyActions();
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
                <Fields item={item}/>
            </Form>
        </Panel>
    );

    return (
        <DetailView 
            title={t('views:agency.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}

