import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Company, CompanySearchModel } from '../../models/company';
import { CompanyService } from './service';
import { LookupKey } from '../lookup';
import { Logger } from '../../framework/logger/types';
import { useLocalReducer } from '../../framework/hooks';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'COMPANY';

const baseActions = (logger: Logger, dispatch: any, root: RootState, globalDispatch: any) => (
    EntityActions<Company, CompanySearchModel, RootState, CompanyService>({
        key,
        logger,
        ctor: Company,
        dispatch,
        service: root.service.company,
        getState: () => root,
        options:{
            save: {
                onSuccess: (item: Company) => (dispatch: any, state: any) => {
                    globalDispatch({ type: 'LOOKUP/ADD_OR_REPLACE', key: LookupKey.COMPANY, item });
                    return Promise.resolve(item);
                }
            }
        }
    })
)

export const useCompanyActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, root, dispatch),
        logger
    };
}

export const useLocalCompanyActions = (initialState?: Partial<CompanyState>) => {

    const { state, dispatch } = useLocalReducer(companyReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const globalDispatch = useDispatch<any>();
    
    return {
        actions: baseActions(logger, dispatch, root, globalDispatch),
        state,
        logger
    };
}

export type CompanyState = EntityLoaderState<Company, CompanySearchModel>;

export const companyReducer: Reducer<CompanyState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new CompanySearchModel() }));
