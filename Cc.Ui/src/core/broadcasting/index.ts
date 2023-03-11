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
import { Broadcasting, BroadcastingSearchModel } from '../../models/broadcasting';
import { BroadcastingService } from './service';

const key = 'BROADCASTING';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<Broadcasting, BroadcastingSearchModel, RootState, BroadcastingService>({
        key,
        logger,
        ctor: Broadcasting,
        dispatch,
        service: root.service.broadcasting,
        getState: () => root
    });

    return base;
}

export const useBroadcastingActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalBroadcastingActions = (initialState?: Partial<BroadcastingState>) => {

    const { state, dispatch } = useLocalReducer(broadcastingReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type BroadcastingState = EntityLoaderState<Broadcasting, BroadcastingSearchModel>;

export const broadcastingReducer: Reducer<BroadcastingState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new BroadcastingSearchModel() }));