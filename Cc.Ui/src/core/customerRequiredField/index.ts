import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { Logger } from '../../framework/logger/types';
import { RootState } from '../../app/reducers';
import { CustomerRequiredField, CustomerRequiredFieldSearchModel } from '../../models/customerRequiredField';
import { CustomerRequiredFieldService } from './service';
import { api } from '../../framework/core/logic';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'CUSTOMER_REQUIRED_FIELD';
const K = {
    GET_REQUIRED: 'CUSTOMER_REQUIRED_FIELD/GET_REQUIRED'
}
const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<CustomerRequiredField, CustomerRequiredFieldSearchModel, RootState, CustomerRequiredFieldService>({
            key,
            logger,
            ctor: CustomerRequiredField,
            dispatch,
            service: root.service.customerRequiredField,
            getState: () => root
        }
    );
    return {
        ...base,
        getRequired: (companyId?: number, agencyId?: number, productId?: number) => {
            let model = new CustomerRequiredFieldSearchModel();
            model.companyId = companyId;
            model.agencyId = agencyId;
            model.productId = productId;
            return api(model)(
                K.GET_REQUIRED,
                logger,
                dispatch,
                root.service.customerRequiredField.getRequired(model)
            );            
        }
    }
}

export const useCustomerRequiredFieldActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalCustomerRequiredFieldActions = (initialState?: Partial<CustomerRequiredFieldState>) => {

    const { state, dispatch } = useLocalReducer(customerRequiredFieldReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type CustomerRequiredFieldState = EntityLoaderState<CustomerRequiredField, CustomerRequiredFieldSearchModel>;

export const customerRequiredFieldReducer: Reducer<CustomerRequiredFieldState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new CustomerRequiredFieldSearchModel() }));
