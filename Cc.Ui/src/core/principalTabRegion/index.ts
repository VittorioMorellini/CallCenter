import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { EntityLoaderState } from '../../framework/core/types';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { Logger } from '../../framework/logger/types';
import { RootState } from '../../app/reducers';
import { PrincipalTabRegion, PrincipalTabRegionSearchModel } from '../../models/principalTabRegion';
import { PrincipalTabRegionService } from './service';

const key = 'PRINCIPAL_TAB_REGION';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<PrincipalTabRegion, PrincipalTabRegionSearchModel, RootState, PrincipalTabRegionService>({
        key,
        logger,
        ctor: PrincipalTabRegion,
        dispatch,
        service: root.service.principalTabRegion,
        getState: () => root
    });

    return base;
}

export const usePrincipalTabRegionActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalPrincipalTabRegionActions = (initialState?: Partial<PrincipalTabRegionState>) => {

    const { state, dispatch } = useLocalReducer(principalTabRegionReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type PrincipalTabRegionState = EntityLoaderState<PrincipalTabRegion, PrincipalTabRegionSearchModel>;

export const principalTabRegionReducer: Reducer<PrincipalTabRegionState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new PrincipalTabRegionSearchModel() }));