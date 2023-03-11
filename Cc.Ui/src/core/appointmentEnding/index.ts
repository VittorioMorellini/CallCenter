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
import { AppointmentEnding, AppointmentEndingSearchModel } from '../../models/appointmentEnding';
import { AppointmentEndingService } from './service';

const key = 'APPOINTMENT_ENDING';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<AppointmentEnding, AppointmentEndingSearchModel, RootState, AppointmentEndingService>({
        key,
        logger,
        ctor: AppointmentEnding,
        dispatch,
        service: root.service.appointmentEnding,
        getState: () => root
    });

    return base;
}

export const useAppointmentEndingActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalAppointmentEndingActions = (initialState?: Partial<AppointmentEndingState>) => {

    const { state, dispatch } = useLocalReducer(appointmentEndingReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type AppointmentEndingState = EntityLoaderState<AppointmentEnding, AppointmentEndingSearchModel>;

export const appointmentEndingReducer: Reducer<AppointmentEndingState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new AppointmentEndingSearchModel() }));