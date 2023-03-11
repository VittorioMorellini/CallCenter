import { i18n } from '../i18n';
import { EntityStorage } from '../entity';
import { EntityStorageProps } from '../entity/types';
// import { ILogger } from '../logger/types';
import { Logger } from '../logger/types';
import { Action } from './types';

export interface ExecuterProps<M extends any> {

    key: string;
    logger: Logger;
    dispatch: any;
    model: M;
    state: any;
    fn: (model: M) => Promise<any>;
    enhanceModel?: (model: M) => (state: any) => M;
    onValidation?: (model: M) => boolean;
    onSuccess?: (obj: any) => (dispatch: any, state: any) => Promise<any>;
    onFailure?: (error: any) => (dispatch: any, state: any) => Promise<any>;    
    cacheOptions?: EntityStorageProps;
    logError?: boolean;
    errorMessage?: string;
    actions?: any;
}

export function executer<M extends any>(props: ExecuterProps<M>) {

    let { dispatch, logger, fn, model, state, errorMessage, cacheOptions, logError } = props;
    let { pending, success, failure } = props.actions;
    logError = logError !== undefined ? logError : true;

    dispatch(pending(model));

    if (props.onValidation !== undefined) {
        if (!props.onValidation(model)) {
            dispatch(failure('Validation failed'));
            logger.error(i18n.t('common:errors.validation'));
            return Promise.reject('Validation failed');
        }
    }

    if (props.enhanceModel !== undefined) {
        model = props.enhanceModel(model)(state);
    }

    let promise = (cacheOptions ? EntityStorage.load(props.key, () => fn(model), cacheOptions) : fn(model));

    return promise
        .then((x: any) => props.onSuccess !== undefined ? props.onSuccess(x)(dispatch, state) : x)
        .then((x: any) => {
            dispatch(success(x));
            return Promise.resolve(x);
        })
        .catch((e: any) => {

            if (props.onFailure !== undefined) {
                props.onFailure(e)(dispatch, state);
            }

            dispatch(failure(e));

            let message = e;
            // TODO ServiceError
            if (e instanceof Error)
                message = e.message;
            
            if (logError) {
                logger.error(message, i18n.t(errorMessage!)); // TODO non so sia ancora corretto errorMessage
            }

            return Promise.reject(e);
        });
}

export const api = <M> (model?: M) => (actionKey: string, logger: Logger, dispatch: any, promise: Promise<any>, cacheOptions?: EntityStorageProps) => {

    let executerProps: ExecuterProps<M> = {
        key: actionKey,
        logger,
        dispatch,
        state: null,
        model: model!,
        fn: x => promise,
        cacheOptions
    };        

    return executer({
        ...executerProps,
        errorMessage: executerProps.errorMessage || 'common:errors.api',
        actions: executerProps.actions || {
            // tslint:disable-next-line: no-shadowed-variable
            pending: (model: any) => <Action> { type: `${actionKey}_PENDING`, model },
            success: (payload: any) => <Action> { type: `${actionKey}_SUCCESS`, payload },
            failure: (error: any) => <Action> { type: `${actionKey}_FAILURE`, error }
        }
    });
}
