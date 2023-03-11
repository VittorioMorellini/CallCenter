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
import { Warehouse, WarehouseSearchModel } from '../../models/warehouse';
import { WarehouseService } from './service';

const key = 'WAREHOUSE';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<Warehouse, WarehouseSearchModel, RootState, WarehouseService>({
        key,
        logger,
        ctor: Warehouse,
        dispatch,
        service: root.service.warehouse,
        getState: () => root
    });

    return base;
}

export const useWarehouseActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalWarehouseActions = (initialState?: Partial<WarehouseState>) => {

    const { state, dispatch } = useLocalReducer(warehouseReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type WarehouseState = EntityLoaderState<Warehouse, WarehouseSearchModel>;

export const warehouseReducer: Reducer<WarehouseState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new WarehouseSearchModel() }));