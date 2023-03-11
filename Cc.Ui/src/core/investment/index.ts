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
import { Investment, InvestmentSearchModel } from '../../models/investment';
import { InvestmentService } from './service';

const key = 'INVESTMENT';

const baseActions = (logger: Logger, dispatch: any, root: RootState) => {
    const base = EntityActions<Investment, InvestmentSearchModel, RootState, InvestmentService>({
        key,
        logger,
        ctor: Investment,
        dispatch,
        service: root.service.investment,
        getState: () => root
    });

    return base;
}

export const useInvestmentActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key });
    const state = useSelector((root: RootState) => root);
    
    return {
        actions: baseActions(logger, dispatch, state),
        logger
    };
}

export const useLocalInvestmentActions = (initialState?: Partial<InvestmentState>) => {

    const { state, dispatch } = useLocalReducer(investmentReducer, initialState);
    const logger = useLogger({ key });
    const rootState = useSelector((root: RootState) => root);

    return {
        actions: baseActions(logger, dispatch, rootState),
        logger,
        state
    };
}

export type InvestmentState = EntityLoaderState<Investment, InvestmentSearchModel>;

export const investmentReducer: Reducer<InvestmentState, any> = typeToReducer({
    ...EntityReducer(key)
}, EntityLoaderInitialState({ searchModel: new InvestmentSearchModel() }));