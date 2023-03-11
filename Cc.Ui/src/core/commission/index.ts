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
import { Commission, CommissionSearchModel } from '../../models/commission';
import { CommissionService } from './service';

const key = 'COMMISSION';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<Commission, CommissionSearchModel, RootState, CommissionService>({
        key,
        logger,
        ctor: Commission,
        dispatch,
        service: root.service.commission,
        getState: () => root
    });

    return base;
}

export const useCommissionActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalCommissionActions = (initialState?: Partial<CommissionState>) => {

    const { state, dispatch } = useLocalReducer(commissionReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type CommissionState = EntityLoaderState<Commission, CommissionSearchModel>;

export const commissionReducer: Reducer<CommissionState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new CommissionSearchModel() }));