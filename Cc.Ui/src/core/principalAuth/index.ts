import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, EntityLocalActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { PrincipalAuth, PrincipalAuthSearchModel } from '../../models/principalAuth';
import { PrincipalAuthService } from './service';
import { useEnhanceModel } from '../../app/core/hooks';
import { Logger } from '../../framework/logger/types';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'PRINCIPAL_AUTH';

const baseActions = (logger: Logger, dispatch: any, root: RootState, enhanceModel: any) => ({
    ...EntityActions<PrincipalAuth, PrincipalAuthSearchModel, RootState, PrincipalAuthService>({
        key,
        logger,
        ctor: PrincipalAuth,
        dispatch,
        service: root.service.principalAuth,
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
})

export const usePrincipalAuthActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();

    return {
        actions: baseActions(logger, dispatch, root, enhanceModel),
        logger
    };
}

export const useLocalPrincipalAuthActions = (initialState?: Partial<PrincipalAuthState>) => {

    const { state, dispatch } = useLocalReducer(principalAuthReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();

    return {
        actions: baseActions(logger, dispatch, root, enhanceModel),
        logger,
        state
    };
}

export type PrincipalAuthState = EntityLoaderState<PrincipalAuth, PrincipalAuthSearchModel>;

export const principalAuthReducer: Reducer<PrincipalAuthState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new PrincipalAuthSearchModel() }));
