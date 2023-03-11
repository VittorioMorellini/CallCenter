import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { middleware, middlewareLogger  } from '../framework/core/middleware';
//import { loadUser } from 'redux-oidc';
//import userManager from './userManager';
import { root, RootState } from './reducers';

let mws = [ 
    middleware
];

if (process.env.NODE_ENV === 'development') {
   mws = [...mws, middlewareLogger];
}

const store: Store<RootState> = createStore<RootState, AnyAction, any, any>(
    root,
    {} as RootState,
    applyMiddleware(...mws)
);

// loadUser(store, userManager);

export default store;