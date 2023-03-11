import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useIdentity } from '../../app/core/hooks';
import { RootState } from '../../app/reducers';
import { useRoleFullTypes, useRoleTypes } from '../../core';
import { useLocalDocumentActions } from '../../core/document';
import { useDetailMode } from '../../framework/hooks';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { UploadFile } from '../../framework/ui/form/types';
import { DateUtils } from '../../framework/utils';
import { Principal } from '../../models';
import {Document} from '../../models/document';

type Props = {
    item: Principal;
    setItem: (obj: Principal) => void
    onUploadCompleted?: () => void;
}

export default ({ item, setItem, onUploadCompleted }: Props) => { 
    const { isAdmin } = useIdentity();
    const { actions: documentActions } = useLocalDocumentActions();
    const roles = useRoleTypes();
    const fullRoles = useRoleFullTypes();
    const { t } = useTranslation();
    const { isUpdate } = useDetailMode(item);    
    const { countries } = useSelector((root: RootState) => root.lookup);

    return (    
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                <Field.Input model={(x: Principal) => x.surname}  />
                <Field.Input model={(x: Principal) => x.name}  />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                <Field.Input model={(x: Principal) => x.username}
                    ControlProps={{disabled: isUpdate}}
                />
                <Field.Input model={(x: Principal) => x.password}
                    ControlProps={{type: 'password'}}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                <Field.Input model={(x: Principal) => x.taxCode}  />
                <Field.Autocomplete 
                    model={(x: Principal) => x.role}
                    options={autocompleteOptions(isAdmin ? fullRoles : roles, x => x.value, x => x.label)}
                />
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
                <Field.Switch
                    model={(x: Principal) => x.disabled}
                    onGetValue={(x => x ? true : false)}
                    onSetValue={(x => x ? true : undefined)}
                />
                <Field.Switch
                    model={(x: Principal) => x.agendaLocked}
                    onGetValue={(x => x ? true : false)}
                    onSetValue={(x => x ? true : undefined)}
                />
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
                <Field.Input model={(x: Principal) => x.phone}  />
                <Field.Input model={(x: Principal) => x.mobilePhone}  />
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
                <Field.Input model={(x: Principal) => x.mail}  />
                <Field.Input model={(x: Principal) => x.cap}  />
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
                <Field.Autocomplete 
                    model={(x: Principal) => x.country}
                    options={autocompleteOptions(countries, x => x.code, x => x.name)}
                />
                <Field.Input model={(x: Principal) => x.province}  />
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
                <Field.Input model={(x: Principal) => x.city}  />
                <Field.Input model={(x: Principal) => x.address}  />
            </Box>
            <Field.ImageUpload
                model={(x: Principal) => x.avatarId}
                accept="image/png,image/jpg"
                onUpload={(file: UploadFile) => {
                    documentActions.upload(file, 'Principal').then((doc: Document) => {
                        item.avatarId = doc.id;
                        setItem(item);
                        if (onUploadCompleted) {
                            onUploadCompleted()
                        }
                    })
                }}
                onDownload={(documentId: number) => {
                    documentActions.openFile(documentId);
                }}
                onDelete={(documentId: number) => {
                    documentActions.delete(documentId).then(() => {
                        item.avatarId = undefined;
                        setItem(item);
                    })
                }}
                setImageDataUrl={() => item.avatarId ? documentActions.getImageDataUrl(item.avatarId): Promise.resolve('')}
            />
        </>
    )
}