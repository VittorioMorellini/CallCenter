// import { useReducer } from 'React';
import { ExecuterProps, executer } from './logic';
import { Entity, EntityUtils } from '../entity';
import { Action } from './types';

type Props<T extends Entity> = {
    key: string;
    logger: any;
    // ctor: EntityConstructor<T>;
    dispatch: any;
    service: any;

    options?: {
        find?:   Partial<ExecuterProps<any>>;
        search?: Partial<ExecuterProps<any>>;
        save?:   Partial<ExecuterProps<any>>;
        delete?: Partial<ExecuterProps<any>>;
    };
}

export function EntityLocalActions <T extends Entity, M extends Entity> (props: Props<T>) {

    const search = (model: M): Promise<any> => {

        let { key, logger, dispatch, service } = props;
        let actionKey = `${key}/SEARCH`;
        let options = props.options !== undefined ? props.options.search : undefined;

        let executerProps: ExecuterProps<M> = {
            key: actionKey,
            logger,
            dispatch,
            state: null,
            model,
            fn: x => service.searchAsync(x),
            ...options,
        };        

        return executer({
            ...executerProps,
            errorMessage: executerProps.errorMessage || 'common:errors.search',
            actions: executerProps.actions || {
                // tslint:disable-next-line: no-shadowed-variable
                pending: (model: any) => <Action> { type: `${actionKey}_PENDING`, model },
                success: (items: T[]) => <Action> { type: `${actionKey}_SUCCESS`, items },
                failure: (error: any) => <Action> { type: `${actionKey}_FAILURE`, error }
            }
        });
    };

    const save = (item: T): Promise<any> => {

        let { key, logger, service, dispatch } = props;
        let actionKey = `${key}/SAVE`;
        let options = props.options !== undefined ? props.options.save : undefined;

        let executerProps: ExecuterProps<T> = {
            key: actionKey,
            logger,
            dispatch,
            state: null,
            model: item,
            fn: x => service.save(x),
            ...options,
        };  

        return executer({
            ...executerProps,
            errorMessage: executerProps.errorMessage || 'common:errors.save',
            actions: executerProps.actions || {
                // tslint:disable-next-line: no-shadowed-variable
                pending: (item: T)    => <Action> { type: `${actionKey}_PENDING`, item },
                // tslint:disable-next-line: no-shadowed-variable
                success: (item: T)    => <Action> { type: `${actionKey}_SUCCESS`, item },
                failure: (error: any) => <Action> { type: `${actionKey}_FAILURE`, error }
            },
            onValidation: executerProps.onValidation || (x => EntityUtils.validate(x)),
        });
    };

    const deleteFn = (id: string | number): Promise<any> => {

        let { key, logger, service, dispatch } = props;
        let actionKey = `${key}/DELETE`;
        let options = props.options !== undefined ? props.options.delete : undefined;

        let executerProps: ExecuterProps<string | number> = {
            key: actionKey,
            logger,
            dispatch,
            state: null,
            model: id,
            fn: x => service.delete(x),
            ...options,
        }; 
        
        return executer({
            ...executerProps,
            errorMessage: executerProps.errorMessage || 'common:errors.delete',
            actions: executerProps.actions || {
                pending: (model: any) => <Action> { type: `${actionKey}_PENDING`, model },
                success: (id: any)    => <Action> { type: `${actionKey}_SUCCESS`, id },
                failure: (error: any) => <Action> { type: `${actionKey}_FAILURE`, error }
            }
        });
    };

    const itemSelected = (item: T, index: number) => props.dispatch({ type: props.key + '/ITEM_SELECTED', item, index })

    const setItems = (items: T[]) => props.dispatch({ type: props.key + '/SET_ITEMS', items })

    return {
        save,
        delete: deleteFn,
        itemSelected,
        setItems,
        search
    }
}