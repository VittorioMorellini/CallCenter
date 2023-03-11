import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { TabCountryService } from './service';
import { TabCountry, TabCountrySearchModel } from '../../models/tabCountry';
import { Logger } from '../../framework/logger/types';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'TAB_COUNTRY';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => (
    EntityActions<TabCountry, TabCountrySearchModel, RootState, TabCountryService>({
        key,
        logger,
        ctor: TabCountry,
        dispatch,
        service: root.service.tabCountry,
        getState: () => root
    })
)

export const useTabCountryActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const service = useSelector((state: RootState) => state.service.tabCountry)
    const root = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, root),
        logger
    };
}

export const useLocalTabCountryActions = (initialState?: Partial<TabCountryState>) => {

    const { state, dispatch } = useLocalReducer(tabCountryReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, root),
        logger,
        state
    };
}

export type TabCountryState = EntityLoaderState<TabCountry, TabCountrySearchModel>;

export const tabCountryReducer: Reducer<TabCountryState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new TabCountrySearchModel() }));
