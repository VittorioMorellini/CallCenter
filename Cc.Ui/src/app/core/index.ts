//import { User } from 'oidc-client';
import { useDispatch, useSelector } from 'react-redux';
import { useLookupActions } from '../../core/lookup';
import { useLogger } from '../../framework/logger';
import { useIdentityActions } from './identity';
//import userManager from '../../app/userManager';
import { RootState } from '../../app/reducers';
import { Step } from './reducer';
import moment from 'moment';
import { K } from './reducer';
import { useNavigate, useLocation } from 'react-router';
import { i18n } from '../../framework/i18n';
import { Action } from '../../framework/core/types';
import { useLocalDocumentActions } from '../../core/document';
import { AuthenticateResponse } from '../../models/authenticateResponse';
import { Principal } from '../../models/principal';

export function useAppActions() {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key: 'APP'});
    const { actions: lookupActions } = useLookupActions();
    const { actions: identityActions } = useIdentityActions();
    const { actions: documentActions } = useLocalDocumentActions();
    const step = useSelector((root: RootState) => root.app.step)
    const history = useNavigate();

    const actions = {
        init: async (x?: any): Promise<any> => {
            console.log('init action')
            // per ora forzo la lingua italiana perchè non ho completato le traduzione in inglese
            // e non è presente un'area di impostazioni utente nella quale si possa salvare la propria preferenza
            let { pending, success, failure } = {
                pending: ()             => <Action> { type: 'APP/INIT_PENDING' },
                success: ()             => <Action> { type: 'APP/INIT_SUCCESS' },
                failure: (error: any)   => <Action> { type: 'APP/INIT_FAILURE', error }
            };
            dispatch(pending());

            try {
                // let identity = await identityActions.get();
                // if (identity.language)
                //     actions.changeLanguage(identity.language, i18n);
                // if (identity.avatarId)
                //     actions.setUserAvatar(identity.avatarId);

                // if (identity.agencyIds && identity.agencyIds.length > 0)
                //     actions.setAgency(identity.agencyIds[0]);
                // Set initial current route
                // actions.navigate('');
                console.log('init', x)
                await actions.lookup();
                dispatch(success())

                return Promise.resolve();
            }
            catch (ex) {
                dispatch(failure(ex))
                return Promise.reject('init failed')
            }
        },
        lookup: async (): Promise<any> => {

            try {
                // prima carico le lookup basilari
                await Promise.all([
                    lookupActions.company(),
                    lookupActions.category(),
                    lookupActions.commission(),
                    lookupActions.tabCountry(),
                    lookupActions.tabRegion(),
                    lookupActions.warehouseType(),
                ])
                
                // poi quelle con dipendenze a quelle basilari
                await Promise.all([
                    lookupActions.product(),
                    lookupActions.agency(),
                    lookupActions.configuration(),
                    lookupActions.tabDistrict(),
                    lookupActions.broadcasting(),
                ]);

                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
                
        },
        login: async (username: string, password: string): Promise<any> => {

            let { pending, success, failure} = {
                pending: ()             => <Action> { type: 'APP/LOGIN_PENDING' },
                success: ()             => <Action> { type: 'APP/LOGIN_SUCCESS' },
                failure: (error: any)   => <Action> { type: 'APP/LOGIN_FAILURE', error }
            };
    
            // console.log('STEP', step)
            // if (step !== Step.NONE)
            //     return  Promise.reject('LOGIN ALREADY DONE');

            dispatch(pending());
    
            try {
                //TODO
                let identity = await identityActions.authenticate(username, password);
                console.log('principal from resp', identity)
                localStorage.setItem("token", JSON.stringify(identity.token));                    
                if (!identity) {
                    let error = 'Username or password is incorrect';
                    dispatch(failure(error));
                    return Promise.reject(error);
                } else {
                    dispatch({ type: 'APP/SET_USER', identity})
                    dispatch(success());
                    return Promise.resolve(identity);
                }
            }
            catch (error) {
                // console.log(error);
                dispatch(failure(error));
                return Promise.reject(error);
            };
        },
        logout: (): Promise<any> => { 
            
            dispatch({type: K.LOGOUT});
            //.catch((error: any) => logger.error('LOGOUT', error));
            //await () => { }
            localStorage.removeItem("token");
            history('/login');     
            return Promise.resolve();
            // return userManager.signoutRedirect()
            //     .then(() => history.push('/'))
        },
        changeLanguage: (language: string, i18n: any) => {
            moment.locale(language);
            i18n.changeLanguage(language);
            return dispatch({ type: K.CHANGE_LANGUAGE, language });
        },    
        toogleBusy:  (value?: boolean) => dispatch({ type: K.BUSY, value }),
        toggleDrawer: (value?: boolean) => dispatch({ type: K.DRAWER_TOGGLE, value }),
        navigate: (route: string) => dispatch({ type: K.NAVIGATE, route }),
        setStep: (step: Step) => dispatch({ type: K.SET_STEP, step }),
        setCompany: (companyId?: any) => dispatch({ type: K.SET_COMPANY, companyId: companyId }),
        setAgency: (agencyId?: any) => dispatch({ type: K.SET_AGENCY, agencyId: agencyId }),
        setUserAvatar: (avatarId?: number) => {
            if (avatarId) {
                documentActions.getImageDataUrl(avatarId)
                    .then(imageDataUrl => dispatch({ type: K.SET_USER_AVATAR, imageDataUrl }))
            } else {
                dispatch({ type: K.SET_USER_AVATAR, imageDataUrl: undefined })
            }
        }
    }

    // function handleResponse(response: AuthenticateResponse) {

    //     return response.then(text => {
    //         const data = text && JSON.parse(text);
    //         if (!response.ok) {
    //             if ([401, 403].indexOf(response.status) !== -1) {
    //                 // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //                 actions.logout();
    //                 location.push("/");
    //             }
    
    //             const error = (data && data.message) || response.statusText;
    //             return Promise.reject(error);
    //         }
    
    //         return data;
    //     });
    // }    
    
    return {
        logger,
        actions
    }
}