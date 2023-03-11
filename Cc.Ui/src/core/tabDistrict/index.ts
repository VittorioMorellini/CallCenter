import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { TabDistrictService } from './service';
import { TabDistrict, TabDistrictSearchModel } from '../../models/tabDistrict';
import { Logger } from '../../framework/logger/types';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'TAB_DISTRICT';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => (
    EntityActions<TabDistrict, TabDistrictSearchModel, RootState, TabDistrictService>({
        key,
        logger,
        ctor: TabDistrict,
        dispatch,
        service: root.service.tabDistrict,
        getState: () => root
    })
);

export const useTabDistrictActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.tabDistrict)
    const root = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, root),
        logger
    };
}

export const useLocalTabDistrictActions = (initialState?: Partial<TabDistrictState>) => {

    const { state, dispatch } = useLocalReducer(tabDistrictReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);

    const base = baseActions(logger, dispatch, root);
    const actions = {
        ...base,
        searchByTabRegion: (tabRegionId: number) => {
            let model = new TabDistrictSearchModel();
            model.tabRegionId = tabRegionId;
            return base.search(model);
        }
    }
    
    return {
        actions,
        logger,
        state
    };
}

export type TabDistrictState = EntityLoaderState<TabDistrict, TabDistrictSearchModel>;

export const tabDistrictReducer: Reducer<TabDistrictState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new TabDistrictSearchModel() }));
