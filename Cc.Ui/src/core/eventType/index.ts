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
import { EventType, EventTypeSearchModel } from '../../models/eventType';
import { EventTypeService } from './service';

const key = 'EVENT_TYPE';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<EventType, EventTypeSearchModel, RootState, EventTypeService>({
        key,
        logger,
        ctor: EventType,
        dispatch,
        service: root.service.eventType,
        getState: () => root
    });

    return base;
}

export const useEventTypeActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalEventTypeActions = (initialState?: Partial<EventTypeState>) => {

    const { state, dispatch } = useLocalReducer(eventTypeReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type EventTypeState = EntityLoaderState<EventType, EventTypeSearchModel>;

export const eventTypeReducer: Reducer<EventTypeState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new EventTypeSearchModel() }));