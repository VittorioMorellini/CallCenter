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
import { BroadcastingProduct, BroadcastingProductSearchModel } from '../../models/broadcastingProduct';
import { BroadcastingProductService } from './service';

const key = 'BROADCASTING_PRODUCT';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<BroadcastingProduct, BroadcastingProductSearchModel, RootState, BroadcastingProductService>({
        key,
        logger,
        ctor: BroadcastingProduct,
        dispatch,
        service: root.service.broadcastingProduct,
        getState: () => root
    });

    return base;
}

export const useBroadcastingProductActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalBroadcastingProductActions = (initialState?: Partial<BroadcastingProductState>) => {

    const { state, dispatch } = useLocalReducer(broadcastingProductReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type BroadcastingProductState = EntityLoaderState<BroadcastingProduct, BroadcastingProductSearchModel>;

export const broadcastingProductReducer: Reducer<BroadcastingProductState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new BroadcastingProductSearchModel() }));