import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, EntityLocalActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { TabRegionService } from './service';
import { TabRegion, TabRegionSearchModel } from '../../models/tabRegion';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'TAB_REGION';

export const useTabRegionActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.tabRegion)
    const state = useSelector((root: RootState) => root);

    const actions = EntityActions<TabRegion, TabRegionSearchModel, RootState, TabRegionService>({
        key,
        logger,
        ctor: TabRegion,
        dispatch,
        service,
        getState: () => state
    });
    
    return {
        actions,
        logger
    };
}

export const useLocalTabRegionActions = (initialState?: Partial<TabRegionState>) => {

    const { state, dispatch } = useLocalReducer(tabRegionReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    const baseActions = EntityLocalActions<TabRegion, TabRegionSearchModel, RootState, TabRegionService>({
        key,
        logger,
        ctor: TabRegion,
        dispatch,
        service: rootState.service.tabRegion,
        getState: () => rootState
    });

    const actions = {
        ...baseActions,
    }
    
    return {
        actions,
        logger,
        state
    };
}

export type TabRegionState = EntityLoaderState<TabRegion, TabRegionSearchModel>;

export const tabRegionReducer: Reducer<TabRegionState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new TabRegionSearchModel() }));
