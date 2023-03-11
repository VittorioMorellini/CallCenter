import { concat } from 'lodash';
import { createDefaultConstants } from './middleware';
import { ListUtils } from '../utils';
import { Entity } from '../entity';
import { hasPager } from './actions';
import { EntityLoaderState } from './types';

export function EntityLoaderInitialState<M>(initial: any) {
    return {
        isBusy: false,
        items: [],
        currentItem: undefined,
        currentItemIndex: 0,
        pageLoader: {
            hasNext: true
        },
        ...initial
    };
}

function setState<T extends Entity, M>(prevState: EntityLoaderState<T, M>, newState: Partial<EntityLoaderState<T, M>>) {

    return {
        ...prevState,
        ...newState
    };
}

export function EntityReducer<S extends EntityLoaderState<T, M>, T extends Entity, M>(key: string) {

    let K = {
        ...createDefaultConstants(key),
        SEARCH_NEXT_PAGE: key + '/SEARCH_NEXT_PAGE',
        SET_MODEL: key + '/SET_MODEL',
        SET_ITEMS: key + '/SET_ITEMS',
        ADD_OR_REPLACE: key + '/ADD_OR_REPLACE',
    };

    let resetSkip = (m: M) => {

        if (hasPager(m)) {
            m.pager.skip = 0;
        }
        
        return m;
    };

    return {
        [K.FIND]: {
            PENDING: (state: S) => setState(state, {
                isBusy: true
            }),
            SUCCESS: (state: S, { item }: any) => setState(state, {
                isBusy: false,
                currentItem: item
            }),
            FAILURE: (state: S) => setState(state, {
                isBusy: false
            })
        },
        [K.SEARCH]: {
            PENDING: (state: S, { model }: any) => setState(state, {
                isBusy: true,
                searchModel: resetSkip(model)
            }),
            SUCCESS: (state: S, { items, hasNext }: any) => setState(state, {
                isBusy: false,
                items,
                pageLoader: {
                    ...state.pageLoader,
                    hasNext
                }
            }),
            FAILURE: (state: S) => setState(state, {
                isBusy: false
            })
        },
        [K.SEARCH_NEXT_PAGE]: {
            PENDING: (state: S) => setState(state, {
                pageLoader: {
                    ...state.pageLoader,
                    isLoading: true
                },
                currentItemIndex: 0
            }),
            SUCCESS: (state: S, { items }: any) => setState(state, {
                items: concat(state.items, items),
                searchModel: resetSkip(state.searchModel),
                pageLoader: {
                    ...state.pageLoader,
                    isLoading: false,
                    hasNext: items.length === 0 ? false : true
                }
            }),
            FAILURE: (state: S) => setState(state, {
                searchModel: resetSkip(state.searchModel),
                pageLoader: {
                    ...state.pageLoader,
                    hasNext: false,
                    isLoading: false
                }
            })
        },
        [K.SAVE]: {
            PENDING: (state: S) => setState(state, {
                isBusy: true
            }),
            SUCCESS: (state: S, { item }: any) => setState(state, {
                isBusy: false,
                items: ListUtils.addOrReplace(state.items, x => x.id === item.id, item),
                currentItem: item
            }),
            FAILURE: (state: S) => setState(state, {
                isBusy: false
            })
        },
        [K.DELETE]: {
            PENDING: (state: S) => setState(state, {
                isBusy: true
            }),
            SUCCESS: (state: S, { id }: any) => setState(state, {
                isBusy: false,
                currentItem: undefined,
                currentItemIndex: undefined,
                items: ListUtils.remove(state.items, (x: any) => x.id === id)
            }),
            FAILURE: (state: S) => setState(state, {
                isBusy: false
            })
        },
        [K.ITEM_SELECTED]: (state: S, { item, index }: any) => setState(state, {
            isBusy: false,
            currentItem: item,
            currentItemIndex: index
        }),
        [K.CLEAR_ITEM]: (state: S, { item, index }: any) => setState(state, {
            isBusy: false,
            currentItem: undefined
        }),
        [K.SET_MODEL]: (state: S, { model }: any) => setState(state, {
            searchModel: model
        }),
        [K.SET_ITEMS]: (state: S, { items }: any) => setState(state, {
            items
        }),
        [K.ADD_OR_REPLACE]: (state: S, { item }: any) => setState(state, {
            items: ListUtils.addOrReplace(state.items, x => x.id === item.id, item)
        })
    };
}