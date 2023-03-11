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
import { BroadcastingTabRegion, BroadcastingTabRegionSearchModel } from '../../models/broadcastingTabRegion';
import { BroadcastingTabRegionService } from './service';

const key = 'BROADCASTING_TAB_REGION';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<BroadcastingTabRegion, BroadcastingTabRegionSearchModel, RootState, BroadcastingTabRegionService>({
        key,
        logger,
        ctor: BroadcastingTabRegion,
        dispatch,
        service: root.service.broadcastingTabRegion,
        getState: () => root
    });

    return base;
}

export const useBroadcastingTabRegionActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalBroadcastingTabRegionActions = (initialState?: Partial<BroadcastingTabRegionState>) => {

    const { state, dispatch } = useLocalReducer(broadcastingTabRegionReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type BroadcastingTabRegionState = EntityLoaderState<BroadcastingTabRegion, BroadcastingTabRegionSearchModel>;

export const broadcastingTabRegionReducer: Reducer<BroadcastingTabRegionState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new BroadcastingTabRegionSearchModel() }));