import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, usePageLoader } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Customer, CustomerSearchModel } from '../../models/customer';
import { CustomerService } from './service';
import { useEnhanceModel } from '../../app/core/hooks';
import { Logger } from '../../framework/logger/types';
import { CustomerTypes } from '../../models';
import { EntityLoaderState } from '../../framework/core/types';
import { api } from '../../framework/core/logic';

const key = 'CUSTOMER';

const baseActions = (logger: Logger, dispatch: any, root: RootState, enhanceModel: any) => {
    const base = EntityActions<Customer, CustomerSearchModel, RootState, CustomerService>({
        key,
        logger,
        ctor: Customer,
        dispatch,
        service: root.service.customer,
        getState: () => root,
        options: {
            search: {
                enhanceModel
            },
            delete: {
                logError: false
            }
        }
    });

    return {
        ...base,
        // findByTaxCode: (taxCode: string, companyId: number) => {
        //     let model = new CustomerSearchModel();
        //     model.companyId = companyId;
        //     model.taxCode = taxCode;
        //     return base.search(model)
        // },
        findBySalesmanId: (companyId: number, salesmanId: number) => {
            let model = new CustomerSearchModel();
            model.type = CustomerTypes.CORPORATE.toString();
            model.companyId = companyId;
            model.salesmanId = salesmanId;
            return base.search(model)
        },
    }
}

export const useCustomerActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();
    const actions = baseActions(logger, dispatch, root, enhanceModel);
    const pageLoader = usePageLoader(actions, root.customer);

    return {
        actions,
        logger,
        pageLoader
    };
}

export const useLocalCustomerActions = (initialState?: Partial<CustomerState>) => {

    const { state, dispatch } = useLocalReducer(customerReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();

    return {
        actions: baseActions(logger, dispatch, root, enhanceModel),
        logger,
        state
    };
}

export type CustomerState = EntityLoaderState<Customer, CustomerSearchModel>;

export const customerReducer: Reducer<CustomerState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new CustomerSearchModel() }));