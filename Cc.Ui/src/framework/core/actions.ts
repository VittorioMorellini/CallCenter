import { useMemo } from 'react';
import { Entity, EntityUtils, YupValidator } from '../entity';
import { EntityConstructor } from '../entity/types';
import { ExecuterProps, executer } from './logic';
import { IBaseService } from './service';
import { Action, EntityActionsType, EntityLoaderState, PageLoader } from './types';

export interface EntityActionsProps<T extends Entity, M, R, S extends IBaseService<T>> {
    key: string;
    logger: any;
    ctor: EntityConstructor<T>;
    service: S;
    dispatch: any;
    getState?: () => R;

    options?: {
        find?:   Partial<ExecuterProps<any>>;
        search?: Partial<ExecuterProps<any>>;
        save?:   Partial<ExecuterProps<any>>;
        delete?: Partial<ExecuterProps<any>>;
    };
}

export class Pager {

    skip?: number;
    take?: number;
    orderBy?: string;
    ignore?: boolean = false;
}

export interface Pagination  {

    pager: Pager;
}

export function hasPager (object: any): object is Pagination {
    const myInterface = object as Pagination;
    return myInterface.pager !== undefined;
}


function BaseActions<T extends Entity, M, R, S extends IBaseService<T>>
    (props: EntityActionsProps<T, M, R, S>) {

    const find = (id: string | number): Promise<T> => {

        let { key, logger, service, dispatch, getState } = props;
        let actionKey = `${key}/FIND`;
        let options = props.options !== undefined ? props.options.find : undefined;
        let state = getState!();

        let executerProps: ExecuterProps<string | number> = {
            key: actionKey,
            logger,
            dispatch,
            state,
            model: id,
            fn: x => service.find(x),
            ...options,
        };        

        return executer({
            ...executerProps,
            errorMessage: executerProps.errorMessage || 'common:errors.find',
            actions: executerProps.actions || {
                pending: (model: any) => <Action> { type: `${actionKey}_PENDING`, model },
                success: (item: T)    => <Action> { type: `${actionKey}_SUCCESS`, item },
                failure: (error: any) => <Action> { type: `${actionKey}_FAILURE`, error }
            }
        });
    };

    const baseSearch = (searchKey: string, model: M, hasNext: boolean): Promise<T[]> => {

        let { key, logger, service, dispatch, getState } = props;
        let actionKey = `${key}/${searchKey}`;
        let options = props.options !== undefined ? props.options.search : undefined;
        let state = getState!();

        let executerProps: ExecuterProps<M> = {
            key: actionKey,
            logger,
            dispatch,
            state,
            model,
            fn: x => service.search(x),
            ...options,
        };        

        return executer({
            ...executerProps,
            errorMessage: executerProps.errorMessage || 'common:errors.search',
            actions: executerProps.actions || {
                // tslint:disable-next-line: no-shadowed-variable
                pending: (model: any) => <Action> { type: `${actionKey}_PENDING`, model },
                success: (items: T[]) => <Action> { type: `${actionKey}_SUCCESS`, items, hasNext },
                failure: (error: any) => <Action> { type: `${actionKey}_FAILURE`, error }
            }
        });
    };

    const search = (model: M): Promise<T[]> => {
        
        return baseSearch('SEARCH', model, true);
    };

    const searchAll = (model: M): Promise<T[]> => {

        if (hasPager(model)) {
            model.pager.ignore = true;
        }
        
        return baseSearch('SEARCH', model, false);
    };

    const searchNextPage = (model: M, skip: number): Promise<T[]> => {

        if (hasPager(model)) {
            model.pager.skip = skip;
        }

        return baseSearch('SEARCH_NEXT_PAGE', model, true);
    };

    const save = (item: T, validator?: YupValidator): Promise<T> => {

        let { key, logger, service, dispatch, getState } = props;
        let actionKey = `${key}/SAVE`;
        let options = props.options !== undefined ? props.options.save : undefined;
        let state = getState!();

        let executerProps: ExecuterProps<T> = {
            key: actionKey,
            logger,
            dispatch,
            state,
            model: item,
            fn: x => service.save(x),
            onValidation: validator ? x => validator.validate(x) : undefined,
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

        let { key, logger, service, dispatch, getState } = props;
        let actionKey = `${key}/DELETE`;
        let options = props.options !== undefined ? props.options.delete : undefined;
        let state = getState!();

        let executerProps: ExecuterProps<string | number> = {
            key: actionKey,
            logger,
            dispatch,
            state,
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

    const itemSelected = (item: T, index: number) => <Action> { type: props.key + '/ITEM_SELECTED', item, index };

    const clearCurrentItem = () => <Action> { type: props.key + '/CLEAR_ITEM' };
    
    const setModel = (model: M) => <Action> { type: props.key + '/SET_MODEL', model };

    const setItems = (items: T[]) => <Action> { type: props.key + '/SET_ITEMS', items };

    return {
        find,
        search,
        searchNextPage,
        searchAll,
        save,
        delete: deleteFn,
        itemSelected,
        clearCurrentItem,
        setModel,
        setItems,
    };
}

export function EntityActions<T extends Entity, M, R, S extends IBaseService<T>>
(props: EntityActionsProps<T, M, R, S>) {

    const { dispatch } = props;
    const actions = BaseActions<T, M, R, S>(props);

    return {
        find: actions.find,
        search: actions.search,
        searchNextPage: actions.searchNextPage,
        searchAll: actions.searchAll,
        save: actions.save,
        delete: actions.delete,
        itemSelected: (item: T, index: number) => dispatch(actions.itemSelected(item, index)),
        clearCurrentItem: () => dispatch(actions.clearCurrentItem()),
        setModel: (model: M) => dispatch(actions.setModel(model)),
        setItems: (items: T[]) => dispatch(actions.setItems(items))
    } as EntityActionsType<T, M>
}

export function EntityLocalActions<T extends Entity, M, R, S extends IBaseService<T>>
(props: EntityActionsProps<T, M, R, S>) {

    const { dispatch } = props;
    const actions = BaseActions<T, M, R, S>(props);

    return {
        find: actions.find,
        search: actions.search,
        searchNextPage: actions.searchNextPage,
        searchAll: actions.searchAll,
        save: actions.save,
        delete: actions.delete,
        itemSelected: (item: T, index: number) => dispatch(actions.itemSelected(item, index)),
        clearCurrentItem: () => dispatch(actions.clearCurrentItem()),
        setModel: (model: M) => dispatch(actions.setModel(model)),
        setItems: (items: T[]) => dispatch(actions.setItems(items))
    };
}

export function usePageLoader<T extends Entity, M extends Pagination, R extends EntityLoaderState<T, M>>(actions: EntityActionsType<T, M>, state: R, model?: M) {

    let m = model || state.searchModel;
    
    return useMemo(() => {

        return {
            isLoading: state.pageLoader.isLoading,
            hasNext: state.pageLoader.hasNext,
            take: m?.pager.take || 50,
            loadNext: (skip: number) => {
                return actions.searchNextPage(m, skip);
            }
        } as PageLoader;
    }, [state.pageLoader.isLoading, state.pageLoader.hasNext, m?.pager.take])

}
