import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions, EntityLocalActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { TabCity, TabCitySearchModel  } from '../../models/tabCity';
import { TabCityService } from './service';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'TAB_CITY';

export const useTabCityActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.tabCity)
    const state = useSelector((root: RootState) => root);

    const actions = EntityActions<TabCity, TabCitySearchModel, RootState, TabCityService>({
        key,
        logger,
        ctor: TabCity,
        dispatch,
        service,
        getState: () => state
    });
    
    return {
        actions,
        logger
    };
}

export const useLocalTabCityActions = (initialState?: Partial<TabCityState>) => {

    const { state, dispatch } = useLocalReducer(tabCityReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    const baseActions = EntityLocalActions<TabCity, TabCitySearchModel, RootState, TabCityService>({
        key,
        logger,
        ctor: TabCity,
        dispatch,
        service: rootState.service.tabCity,
        getState: () => rootState
    });

    const actions = {
        ...baseActions,
        searchByDossier: (districtId: number) => {
            let model = new TabCitySearchModel();
            model.districtId = districtId;
            return baseActions.search(model);
        }
    }
    
    return {
        actions,
        logger,
        state
    };
}

export type TabCityState = EntityLoaderState<TabCity, TabCitySearchModel>;

export const tabCityReducer: Reducer<TabCityState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new TabCitySearchModel() }));
