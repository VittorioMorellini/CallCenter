//import { User } from 'oidc-client';
import { Reducer } from 'redux';
import typeToReducer from 'type-to-reducer';
import { AuthenticateResponse } from '../../models';
import { Configuration } from '../../models/configuration';
//import { Configuration } from '../../models';
import { Principal } from '../../models/principal';

export const K = {
    LOGIN               : 'APP/LOGIN',
    LOGOUT              : 'APP/LOGOUT',
    INIT                : 'APP/INIT',    
    DRAWER_TOGGLE       : 'APP/DRAWER_TOGGLE',
    NAVIGATE            : 'APP/NAVIGATE',
    BUSY                : 'APP/BUSY',
    CHANGE_LANGUAGE     : 'APP/CHANGE_LANGUAGE',
    SHOW_INFO_DIALOG    : 'APP/SHOW_INFO_DIALOG',
    HIDE_INFO_DIALOG    : 'APP/HIDE_INFO_DIALOG',
    SET_STEP            : 'APP/SET_STEP',
    SET_USER            : 'APP/SET_USER',
    SET_COMPANY         : 'APP/SET_COMPANY',
    SET_AGENCY          : 'APP/SET_AGENCY',
    SET_USER_AVATAR     : 'APP/SET_USER_AVATAR',
    IDENTITY            : 'APP/GET_IDENTITY',
    CONFIGURATION       : 'APP/GET_CONFIGURATION',
};

export enum Step {
    NONE,
    LOADING,
    INIT,       // ho caricato le tabelle di riferimento dell'utente
    ERROR       // generico errore nel workflow
}

export interface AppState {
    isBusy: boolean;
    step: Step;
    initialized: boolean;
    drawer: boolean;
    currentRoute: string;
    language: string;
    logout: boolean;
    environment: string;
    identity?: Principal;
    userAvatar?: string;
    user?: Principal;
    currentCompanyId?: number; // utilizzato solo dall'admin
    currentAgencyId?: number;
    configuration?: Configuration;
}

const initialState: AppState = {
    isBusy: false,
    step: 0,
    initialized: false,
    drawer: false,
    currentRoute: '',
    language: '',
    logout: false,
    environment: process.env.NODE_ENV || '*',
};

function setState(prevState: AppState, state: Partial<AppState>) {
    return {
        ...prevState,
        ...state
    }
}

export const appReducer: Reducer<AppState, any> = typeToReducer({
    [K.INIT]: {
        PENDING: (state: AppState, action) => setState(state, {
            isBusy: true,
            step: Step.LOADING
        }),        
        SUCCESS: (state: AppState, action) => setState(state, {
            ...state, 
            isBusy: false, 
            initialized: true,
            step: Step.INIT
        }),
        FAILURE: (state: AppState, action) => setState(state, { 
            ...state, 
            isBusy: false,
            step: Step.ERROR
        })
    },   
    [K.SET_STEP]: (state: AppState, { step }) => setState(state, {
        ...state, 
        step
    }), 
    [K.DRAWER_TOGGLE]: (state: AppState, action) => setState(state, { 
        ...state, 
        drawer: action.value || !state.drawer
    }),
    [K.NAVIGATE]: (state: AppState, action) => setState(state, { 
        ...state, 
        currentRoute: action.route
    }),
    [K.BUSY]: (state: AppState, action) => setState(state, { 
        ...state, 
        isBusy: action.value || !state.isBusy
    }),
    [K.CHANGE_LANGUAGE]: (state: AppState, action) => setState(state, { 
        ...state, 
        language: action.language
    }),
    [K.LOGIN]: {
        PENDING: (state: AppState, action) => setState(state, {
            ...state,
            isBusy: true,
            logout: false
        }),        
        SUCCESS: (state: AppState, action) => setState(state, { 
            ...state, 
            isBusy: false,
        }),
        FAILURE: (state: AppState, action) => setState(state, { 
            ...state, 
            isBusy: false
        })
    },
    [K.LOGOUT]: (state: AppState) => setState(state, { 
        ...state, 
        logout: true,
        identity: null,
        initialized: false,
        step: Step.NONE
    }),
    [K.SET_USER]: (state: AppState, identity: Principal) => setState(state, { 
        ...state, 
        user: identity
    }),
    [K.SET_COMPANY]: (state: AppState, { companyId }: any) => setState(state, { 
        ...state, 
        currentCompanyId: companyId
    }),
    [K.SET_AGENCY]: (state: AppState, { agencyId }: any) => setState(state, { 
        ...state, 
        currentAgencyId: agencyId
    }),
    [K.SET_USER_AVATAR]: (state: AppState, { imageDataUrl }: any) => setState(state, { 
        ...state, 
        userAvatar: imageDataUrl
    }),
    [K.IDENTITY]: {
        PENDING: (state: AppState) => setState(state, {
            ...state,
            isBusy: true,
            identity: undefined
        }),        
        SUCCESS: (state: AppState,  { payload }: any) => setState(state, { 
            ...state, 
            isBusy: false,
            identity: payload
        }),
        FAILURE: (state: AppState) => setState(state, { 
            ...state, 
            isBusy: false,
            identity: undefined
        })
    },
    [K.CONFIGURATION]: {
        PENDING: (state: AppState) => setState(state, {
            ...state,
            isBusy: true,
            configuration: undefined
        }),        
        SUCCESS: (state: AppState,  { payload }: any) => setState(state, { 
            ...state, 
            isBusy: false,
            configuration: payload
        }),
        FAILURE: (state: AppState) => setState(state, { 
            ...state, 
            isBusy: false,
            configuration: undefined
        })
    }
    // tslint:disable-next-line:align
}, initialState);