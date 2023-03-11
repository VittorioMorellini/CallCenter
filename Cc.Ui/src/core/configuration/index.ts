import typeToReducer from 'type-to-reducer';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { EntityActions } from '../../framework/core/actions';
import { EntityLoaderInitialState, EntityReducer } from '../../framework/core/reducer';
import { useLocalReducer } from '../../framework/hooks';
import { useLogger } from '../../framework/logger';
import { RootState } from '../../app/reducers';
import { Configuration, ConfigurationSearchModel } from '../../models/configuration';
import { ConfigurationService } from './service';
import { Logger } from '../../framework/logger/types';
import { api } from '../../framework/core/logic';
import { EntityLoaderState } from '../../framework/core/types';

const key = 'CONFIGURATION';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => ({
        ...EntityActions<Configuration, ConfigurationSearchModel, RootState, ConfigurationService>({
            key,
            logger,
            ctor: Configuration,
            dispatch,
            service: root.service.configuration,
            getState: () => root
        }),
        getByCompany: (companyId: number): Promise<Configuration> => {
            return api(null)(
                'APP/GET_CONFIGURATION', 
                logger, 
                dispatch,
                root.service.configuration.getByCompany(companyId)
            );
        }
    }
)

export const useConfigurationActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, root),
        logger
    };
}

export const useLocalConfigurationActions = (initialState?: Partial<ConfigurationState>) => {

    const { state, dispatch } = useLocalReducer(configurationReducer, initialState);
    const logger = useLogger({ key });
    const root = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, root),
        logger,
        state
    };
}

export type ConfigurationState = EntityLoaderState<Configuration, ConfigurationSearchModel>;

export const configurationReducer: Reducer<ConfigurationState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new ConfigurationSearchModel() }));
