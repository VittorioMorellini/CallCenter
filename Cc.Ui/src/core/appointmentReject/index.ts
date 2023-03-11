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
import { AppointmentReject, AppointmentRejectSearchModel } from '../../models/appointmentReject';
import { AppointmentRejectService } from './service';

const key = 'APPOINTMENT_REJECT';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<AppointmentReject, AppointmentRejectSearchModel, RootState, AppointmentRejectService>({
        key,
        logger,
        ctor: AppointmentReject,
        dispatch,
        service: root.service.appointmentReject,
        getState: () => root
    });

    return base;
}

export const useAppointmentRejectActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalAppointmentRejectActions = (initialState?: Partial<AppointmentRejectState>) => {

    const { state, dispatch } = useLocalReducer(appointmentRejectReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type AppointmentRejectState = EntityLoaderState<AppointmentReject, AppointmentRejectSearchModel>;

export const appointmentRejectReducer: Reducer<AppointmentRejectState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new AppointmentRejectSearchModel() }));