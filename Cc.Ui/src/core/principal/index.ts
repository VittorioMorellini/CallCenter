import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, usePageLoader } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Principal, PrincipalSearchModel, PrincipalUpload, PrincipalUploadResult } from '../../models/principal';
import { PrincipalService } from './service';
import { useEnhanceModel } from '../../app/core/hooks';
import { api } from '../../framework/core/logic';
import { Logger } from '../../framework/logger/types';
import { useLocalReducer } from '../../framework/hooks';
import { ListUtils } from '../../framework/utils';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'PRINCIPAL';
const K = {
    CHECK_USERNAME: 'PRINCIPAL/CHECK_USERNAME',
    CREATE_USER: 'PRINCIPAL/CREATE_USER',
    UPLOAD_USERS: 'PRINCIPAL/UPLOAD_USERS',
    UPLOAD_RESET: 'PRINCIPAL/UPLOAD_RESET',
}

const baseActions = (logger: Logger, dispatch: any, root: RootState, enhanceModel: any) => ({
    ...EntityActions<Principal, PrincipalSearchModel, RootState, PrincipalService>({
        key,
        logger,
        ctor: Principal,
        dispatch,
        service: root.service.principal,
        getState: () => root,
        options: {
            search: {
                enhanceModel
            },
            delete: {
                logError: false
            }
        }
    }),
    usernameExists: (username: string) => {
        return api(username)(
            K.CHECK_USERNAME,
            logger,
            dispatch,
            root.service.principal.usernameExists(username)
        );
    },
    createUser: (item: Principal) => {
        return api(item)(
            K.CREATE_USER,
            logger,
            dispatch,
            root.service.principal.createUser(item)
        );            
    },
})

export const usePrincipalActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();
    const actions = baseActions(logger, dispatch, root, enhanceModel);
    const pageLoader = usePageLoader(actions, root.principal);

    return {
        actions,
        logger,
        pageLoader
    };
}

export const useLocalPrincipalActions = (initialState?: Partial<PrincipalState>) => {

    const { state, dispatch } = useLocalReducer(principalReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();

    return {
        actions: baseActions(logger, dispatch, root, enhanceModel),
        logger,
        state
    };
}

export type PrincipalState = EntityLoaderState<Principal, PrincipalSearchModel>

export const principalReducer: Reducer<PrincipalState, any> = typeToReducer({
    ...EntityReducer(key),
    [K.CREATE_USER]: {
        PENDING: (state: PrincipalState) => setState(state, {
            isBusy: true
        }),
        SUCCESS: (state: PrincipalState, { payload }: any) => setState(state, {
            isBusy: false,
            items: ListUtils.addOrReplace(state.items, x => x.id === payload.id, payload),
            currentItem: payload
        }),
        FAILURE: (state: PrincipalState) => setState(state, {
            isBusy: false
        })
    },    
}, EntityLoaderInitialState({ searchModel: new PrincipalSearchModel() }));

function setState(prevState: PrincipalState, newState: Partial<PrincipalState>) {
    return {
        ...prevState,
        ...newState
    };
}
