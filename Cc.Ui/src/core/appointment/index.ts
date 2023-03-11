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
import { Appointment, AppointmentSearchModel } from '../../models/appointment';
import { AppointmentService } from './service';

const key = 'APPOINTMENT';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<Appointment, AppointmentSearchModel, RootState, AppointmentService>({
        key,
        logger,
        ctor: Appointment,
        dispatch,
        service: root.service.appointment,
        getState: () => root
    });

    return base;
}

export const useAppointmentActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalAppointmentActions = (initialState?: Partial<AppointmentState>) => {

    const { state, dispatch } = useLocalReducer(appointmentReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type AppointmentState = EntityLoaderState<Appointment, AppointmentSearchModel>;

export const appointmentReducer: Reducer<AppointmentState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new AppointmentSearchModel() }));