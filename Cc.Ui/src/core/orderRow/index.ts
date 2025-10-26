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
import { OrderRow, OrderRowSearchModel } from '../../models/orderRow';
import { OrderRowService } from './service';

const key = 'ORDER_ROW';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<OrderRow, OrderRowSearchModel, RootState, OrderRowService>({
        key,
        logger,
        ctor: OrderRow,
        dispatch,
        service: root.service.orderRow,
        getState: () => root
    });

    return base;
}

export const useOrderRowActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalOrderRowActions = (initialState?: Partial<OrderRowState>) => {

    const { state, dispatch } = useLocalReducer(orderRowReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type OrderRowState = EntityLoaderState<OrderRow, OrderRowSearchModel>;

export const orderRowReducer: Reducer<OrderRowState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new OrderRowSearchModel() }));