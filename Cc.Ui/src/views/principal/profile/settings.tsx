import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DetailView, Panel } from '../../../framework/ui';
import { Form } from '../../../framework/ui/form';
import { useFormItem, useDetailMode } from '../../../framework/hooks';
import { RootState } from '../../../app/reducers';
import { usePrincipalActions } from '../../../core/principal';
import { Principal } from '../../../models';
import { useLanguages } from '../../../core';
import { autocompleteOptions, Field } from '../../../framework/ui/form';
import { UploadFile } from '../../../framework/ui/form/types';
import { useLocalDocumentActions } from '../../../core/document';
import { useAppActions } from '../../../app/core';
import { i18n } from '../../../framework/i18n';
import { Document} from '../../../models/document'

export default (props: any) => {

    const history = useNavigate();
    const { t } = useTranslation();
    const isBusy = useSelector((root: RootState) => root.principal.isBusy);
    const [item, setItem] = useFormItem<Principal>(props.item || useSelector((root: RootState) => root.principal.currentItem));
    const { id, isUpdate, isInsert } = useDetailMode(item);
    const { actions, logger } = usePrincipalActions();
    const languages = useLanguages();
    const { actions: documentActions } = useLocalDocumentActions();
    const {actions: appActions} = useAppActions();

    useEffect(() => {
        if (isUpdate) {
            actions.find(id).catch(() => { })
        }
    }, [id]);

    const handler = {
        navigateBack: () => {
            history(-1);
        },
        save: () => {
            if (isInsert) {
                actions.usernameExists(item.username)
                    .then((exists: boolean) => {
                        if (!exists) {
                            actions.createUser(item)
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
        }
    };

    const content = (
        <>
            <Panel>
                <Form item={item} handleChange={setItem}>
                    <Field.Autocomplete 
                        model={(x: Principal) => x.language}
                        options={autocompleteOptions(languages, x => x.value, x => x.label)}
                        onValueChanged={(value: string) => {
                            appActions.changeLanguage(value, i18n);
                        }}
                    />
                    <Field.ImageUpload
                        model={(x: Principal) => x.avatarId}
                        accept="image/png,image/jpg"
                        onUpload={(file: UploadFile) => {
                            documentActions.upload(file, 'Principal').then((doc: Document) => {
                                item.avatarId = doc.id;
                                setItem(item);
                                actions.save(item);
                                appActions.setUserAvatar(item.avatarId);
                            })
                        }}
                        onDownload={(documentId: number) => {
                            documentActions.openFile(documentId);
                        }}
                        onDelete={(documentId: number) => {
                            documentActions.delete(documentId).then(() => {
                                item.avatarId = undefined;
                                setItem(item);
                                appActions.setUserAvatar(undefined);
                            })
                        }}
                        setImageDataUrl={() => item.avatarId ? documentActions.getImageDataUrl(item.avatarId): Promise.resolve('')}
                    />
                </Form>
            </Panel>
            {/* Non Servono le auth nei settings {isUpdate ? (
                <>
                    <PrincipalAuth idMaster={item.id} items={item.principalAuth} agencies={agencies} />
                </>
            ) : null} */}
        </>

    );

    return (
        <DetailView
            title={t('common:settings')}
            isBusy={isBusy}
            content={content}
            isUpdate={isUpdate}
            onBack={handler.navigateBack}
            onSave={handler.save}
        />
    );
}