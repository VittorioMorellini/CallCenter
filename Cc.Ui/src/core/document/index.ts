import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, EntityLocalActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Document, DocumentSearchModel } from '../../models/document';
import { DocumentService } from './service';
import { api } from '../../framework/core/logic';
import { useLocalReducer } from '../../framework/hooks';
import { UploadFile } from '../../framework/ui/form/types';
import { BrowserUtils, ImageUtils } from '../../framework/utils';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'DOCUMENT';

export const useDocumentActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.document)
    const state = useSelector((root: RootState) => root);

    const actions = EntityActions<Document, DocumentSearchModel, RootState, DocumentService>({
        key,
        logger,
        ctor: Document,
        dispatch,
        service,
        getState: () => state
    });
    
    return {
        actions,
        logger
    };
}

export const useLocalDocumentActions = (initialState?: Partial<DocumentState>) => {

    const { state, dispatch } = useLocalReducer(documentReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    const actions = {
        ...EntityLocalActions<Document, DocumentSearchModel, RootState, DocumentService>({
            key,
            logger,
            ctor: Document,
            dispatch,
            service: rootState.service.document,
            getState: () => rootState
        }),
        getFile: (documentId: number): Promise<ArrayBuffer> => {
            return api(documentId)(
                'DOCUMENT/GET_FILE', 
                logger, 
                dispatch, 
                rootState.service.document.getFileStream(documentId)
            );
        },
        getFileSigned: (documentId: number): Promise<ArrayBuffer> => {
            return api(documentId)(
                'DOCUMENT/GET_FILE_SIGNED', 
                logger, 
                dispatch, 
                rootState.service.document.getFileSignedStream(documentId)
            );
        },
        upload: (file: UploadFile, entity: string) => {
            let item = new Document();
            item.type = file.type;
            item.name = file.name;
            item.fileEncoded = file.fileEncoded;
            item.entity = entity;

            return actions.save(item);
        },
        downloadFile:  (documentId: number, name: string) => {
            actions.getFile(documentId).then((file: any) => {
                BrowserUtils.downloadFile(new Uint8Array(file), name);
            })
        },
        openFile:  (documentId: number) => {
            actions.getFile(documentId).then((file: any) => {
                BrowserUtils.openFile(new Uint8Array(file));
            })
        },
        getImageDataUrl: (documentId: number) => {
            return actions.getFile(documentId).then(file => 
                ImageUtils.fromBase64ToDataUrl(BrowserUtils.convertArrayToBase64(file), 'png')
            );
        }
    };
    
    return {
        actions,
        state,
        logger
    };
}

export type DocumentState = EntityLoaderState<Document, DocumentSearchModel>;

export const documentReducer: Reducer<DocumentState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new DocumentSearchModel() }));
