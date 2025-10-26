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
import { OrderTable, OrderTableSearchModel } from '../../models/orderTable';
import { OrderTableService } from './service';

const key = 'ORDER_TABLE';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<OrderTable, OrderTableSearchModel, RootState, OrderTableService>({
        key,
        logger,
        ctor: OrderTable,
        dispatch,
        service: root.service.orderTable,
        getState: () => root
    });

    return base;
}

export const useOrderTableActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalOrderTableActions = (initialState?: Partial<OrderTableState>) => {

    const { state, dispatch } = useLocalReducer(orderTableReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type OrderTableState = EntityLoaderState<OrderTable, OrderTableSearchModel>;

export const orderTableReducer: Reducer<OrderTableState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new OrderTableSearchModel() }));