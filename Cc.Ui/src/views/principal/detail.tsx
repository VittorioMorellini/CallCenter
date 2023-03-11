import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../framework/ui';
import { Form } from '../../framework/ui/form';
import { useFormItem, useDetailMode } from '../../framework/hooks';
import { RootState } from '../../app/reducers';
import { usePrincipalActions } from '../../core/principal';
import PrincipalAuth from '../principalAuth/relatedModal';
import PrincipalTabRegion from '../principalTabRegion/relatedModal';
import Fields from './fields';
import { DateUtils } from '../../framework/utils';
import { Principal } from '../../models/principal';
import { useLocalAgencyActions } from '../../core/agency';
import { useLookups } from '../../core';
import { useLocalProductActions } from '../../core/product';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.principal.isBusy);
    const [item, setItem] = useFormItem<Principal>(props.item || useSelector((root: RootState) => root.principal.currentItem));
    const { id, isUpdate, isInsert } = useDetailMode(item);
    const { actions: agencyActions, state: { items: agencies } } = useLocalAgencyActions();
    const { products, categories } = useLookups();
    const { actions, logger } = usePrincipalActions();
    const { regions } = useLookups();

    useEffect(() => {
        if (isUpdate) {
            actions.find(id).catch(() => { })
        }
    }, [id]);

    useEffect(() => {
        if (isUpdate && item && item.companyId > 0) {
            agencyActions.searchByCompany(item.companyId).catch(() => { });
        }
    }, [item?.companyId]);

    const handler = {
        navigateBack: () => {
            navigate(-1);
        },
        save: () => {
            if (isInsert) {
                actions.usernameExists(item.username)
                    .then((exists: boolean) => {
                        console.log('after exists')
                        if (!exists) {
                            console.log('I gonna save the data')
                            actions.save(item)
                                .then(handler.navigateBack)
                                .catch(() => { })
                        } else {
                            logger.error(t('views:principal.detail.usernameExisting'));
                        }
                    })
                    .catch(() => { })
            } else {
                actions.save(item)
                    .then(handler.navigateBack)
                    .catch(() => { })
            }
        },
        delete: () => {
            actions.delete(item.id)
                .then(handler.navigateBack)
                .catch(({ message }: any) => {
                    if (message.indexOf('REFERENCE constraint') !== -1) {
                        // sono qui perchè è scattato un controllo di integrità referenziale                        
                        logger.info(t('common:deleteConstraintWorkaround'));
                        item.disabled = true;
                        setItem(item);
                        handler.save();
                    }
                });
        }
    };

    // non blocca la transizione ad una nuova route, ma permette solo di fare un check quando si esce dalla corrente
    // let unblock = history.block(location => {
    //     if ((item.role === Roles.AGENT || item.role === Roles.OPERATOR) && (item.principalAuth.length === 0)) {
    //         logger.warning(t('views:principal.detail.principalAuthMissing'));
    //     }
    //     unblock();
    // });

    const content = (
        <>
            <Panel>
                <Form item={item} handleChange={setItem}>
                    <Fields {...{ item, setItem }} onUploadCompleted={() => actions.save(item)} />
                </Form>
                {isUpdate && item ? (
                <>
                    <PrincipalAuth
                        idMaster={item.id}
                        items={item.principalAuth}
                        agencies={agencies}
                        products={products}
                        categories={categories}
                    />
                    <PrincipalTabRegion
                        idMaster={item.id}
                        items={item.principalTabRegion}
                        regions={regions}
                    />
                </>
            ) : null}
            </Panel>
        </>
    );

    return (
        <DetailView
            title={t('views:principal.detail.title')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
            onDelete={handler.delete}
        />
    );
}