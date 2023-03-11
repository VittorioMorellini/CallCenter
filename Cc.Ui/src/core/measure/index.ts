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
import { Measure, MeasureSearchModel } from '../../models/measure';
import { MeasureService } from './service';

const key = 'MEASURE';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<Measure, MeasureSearchModel, RootState, MeasureService>({
        key,
        logger,
        ctor: Measure,
        dispatch,
        service: root.service.measure,
        getState: () => root
    });

    return base;
}

export const useMeasureActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalMeasureActions = (initialState?: Partial<MeasureState>) => {

    const { state, dispatch } = useLocalReducer(measureReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type MeasureState = EntityLoaderState<Measure, MeasureSearchModel>;

export const measureReducer: Reducer<MeasureState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new MeasureSearchModel() }));