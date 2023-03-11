import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { useLogger } from '../../../framework/logger';
import { api } from '../../../framework/core/logic';
import { AuthenticateResponse, Principal } from '../../../models';
import typeToReducer from 'type-to-reducer';

export const useIdentityActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key: 'IDENTITY' });
    const service = useSelector((state: RootState) => state.service.identity)

    const actions = {
        authenticate: (username: string, password: string): Promise<Principal> => {
            return api(null)(
                'APP/GET_IDENTITY', 
                logger, 
                dispatch,
                service.authenticate(username, password)
            );
        },
        // authenticate: (username: string, password: string): Promise<AuthenticateResponse> => {
        //     return api(null)(
        //         'APP/AUTHENTICATE', 
        //         logger, 
        //         dispatch,
        //         service.authenticate(username, password)
        //     );
        // }
    }
    
    return {
        actions,
        logger
    };
}
export type IdentityState = {
    identity?: Principal;
}

const initialState: IdentityState = {
    identity: new Principal()

}

export const identityReducer = typeToReducer({
    ['APP/GET_IDENTITY']: {
        PENDING: (state: IdentityState) => ({
            ...state,
            identity: undefined
        }),        
        SUCCESS: (state: IdentityState, { payload }) => ({ 
            ...state, 
            identity: payload
        })
    },
    // [K.SET_MODEL]: (state: IdentityState, { payload }) => ({ 
    //     ...state,
    //     model: payload
    // })
// tslint:disable-next-line:align
}, initialState);