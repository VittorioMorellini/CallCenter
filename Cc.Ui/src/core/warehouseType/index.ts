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
import { WarehouseType, WarehouseTypeSearchModel } from '../../models/warehouseType';
import { WarehouseTypeService } from './service';

const key = 'WAREHOUSE_TYPE';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<WarehouseType, WarehouseTypeSearchModel, RootState, WarehouseTypeService>({
        key,
        logger,
        ctor: WarehouseType,
        dispatch,
        service: root.service.warehouseType,
        getState: () => root
    });

    return base;
}

export const useWarehouseTypeActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalWarehouseTypeActions = (initialState?: Partial<WarehouseTypeState>) => {

    const { state, dispatch } = useLocalReducer(warehouseTypeReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type WarehouseTypeState = EntityLoaderState<WarehouseType, WarehouseTypeSearchModel>;

export const warehouseTypeReducer: Reducer<WarehouseTypeState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new WarehouseTypeSearchModel() }));