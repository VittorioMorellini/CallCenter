import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Product, ProductSearchModel } from '../../models/product';
import { ProductService } from './service';
import { LookupKey } from '../lookup';
import { useEnhanceModel } from '../../app/core/hooks';
import { useLocalReducer } from '../../framework/hooks';
import { Logger } from '../../framework/logger/types';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'PRODUCT';

const baseActions = (logger: Logger, dispatch: any, root: RootState, enhanceModel: any, globalDispatch: any) => {
    const base = EntityActions<Product, ProductSearchModel, RootState, ProductService>({
        key,
        logger,
        ctor: Product,
        dispatch,
        service: root.service.product,
        getState: () => root,
        options: {
            save: {
                onSuccess: (item: Product) => (dispatch: any, state: any) => {
                    globalDispatch({ type: 'LOOKUP/ADD_OR_REPLACE', key: LookupKey.PRODUCT, item });
                    return Promise.resolve(item);
                }
            },
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
        searchByCompany: (companyId: number) => {
            let model = new ProductSearchModel();
            model.companyId = companyId;
            model.disabled = false
            return base.search(model)
        }
    }
}

export const useProductActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();
    
    return {
        actions: baseActions(logger, dispatch, root, enhanceModel, dispatch),
        logger
    };
}

export const useLocalProductActions = (initialState?: Partial<ProductState>) => {

    const { state, dispatch } = useLocalReducer(productReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();
    const globalDispatch = useDispatch<any>();

    return {
        actions: baseActions(logger, dispatch, root, enhanceModel, globalDispatch),
        logger,
        state
    };
}

export type ProductState = EntityLoaderState<Product, ProductSearchModel>;

export const productReducer: Reducer<ProductState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new ProductSearchModel() }));
