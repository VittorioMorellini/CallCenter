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
import { CustomerCall, CustomerCallSearchModel } from '../../models/customerCall';
import { CustomerCallService } from './service';

const key = 'CUSTOMER_CALL';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<CustomerCall, CustomerCallSearchModel, RootState, CustomerCallService>({
        key,
        logger,
        ctor: CustomerCall,
        dispatch,
        service: root.service.customerCall,
        getState: () => root
    });

    return base;
}

export const useCustomerCallActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalCustomerCallActions = (initialState?: Partial<CustomerCallState>) => {

    const { state, dispatch } = useLocalReducer(customerCallReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type CustomerCallState = EntityLoaderState<CustomerCall, CustomerCallSearchModel>;

export const customerCallReducer: Reducer<CustomerCallState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new CustomerCallSearchModel() }));