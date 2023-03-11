import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Agency, AgencySearchModel } from '../../models/agency';
import { AgencyService } from './service';
import { Logger } from '../../framework/logger/types';
import { useEnhanceModel } from '../../app/core/hooks';
import { LookupKey } from '../lookup';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'AGENCY';

const baseActions = (logger: Logger, dispatch: any, root: RootState, enhanceModel: any, globalDispatch: any) => (
    EntityActions<Agency, AgencySearchModel, RootState, AgencyService>({
        key,
        logger,
        ctor: Agency,
        dispatch,
        service: root.service.agency,
        getState: () => root,
        options:{
            save: {
                onSuccess: (item: Agency) => (dispatch: any, state: any) => {
                    globalDispatch({ type: 'LOOKUP/ADD_OR_REPLACE', key: LookupKey.AGENCY, item });
                    return Promise.resolve(item);
                }
            },
            search: {
                enhanceModel
            }
        }
    })
)

export const useAgencyActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();

    return {
        actions: baseActions(logger, dispatch, root, enhanceModel, dispatch),
        logger
    };
}

export const useLocalAgencyActions = (initialState?: Partial<AgencyState>) => {

    const { state, dispatch } = useLocalReducer(agencyReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    const enhanceModel = useEnhanceModel();
    const globalDispatch = useDispatch<any>();

    const base = baseActions(logger, dispatch, root, enhanceModel, globalDispatch);
    const actions = {
        ...base,
        searchByCompany: (companyId: number) => {
            let model = new AgencySearchModel();
            model.companyId = companyId;
            return base.search(model)
        }
    }
    
    return {
        actions,
        logger,
        state
    };
}

export type AgencyState = EntityLoaderState<Agency, AgencySearchModel>;

export const agencyReducer: Reducer<AgencyState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new AgencySearchModel() }));
