import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, EntityLocalActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Region, RegionSearchModel } from '../../models/region';
import { RegionService } from './service';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'REGION';

export const useRegionActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.region)
    const state = useSelector((root: RootState) => root);

    const actions = EntityActions<Region, RegionSearchModel, RootState, RegionService>({
        key,
        logger,
        ctor: Region,
        dispatch,
        service,
        getState: () => state
    });
    
    return {
        actions,
        logger
    };
}

export const useLocalRegionActions = (dispatch: any) => {

    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.region);
    const state = useSelector((root: RootState) => root);

    const actions = EntityLocalActions<Region, RegionSearchModel, RootState, RegionService>({
        key,
        logger,
        ctor: Region,
        dispatch,
        service,
        getState: () => state
    });
    
    return {
        actions,
        logger
    };
}

export type RegionState = EntityLoaderState<Region, RegionSearchModel>;

export const regionReducer: Reducer<RegionState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new RegionSearchModel() }));
