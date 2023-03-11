export const middleware = ({dispatch, getState}: any) => (next: any) => (action: any) => {

    if (typeof action === 'function') {        
        return action(dispatch, getState());
    }

    return next(action);
};

export const middlewareLogger = (store: any) => (next: any) => (action: any) => {
    
    const prevState = store.getState();
    const returnValue = next(action);
    const nextState = store.getState();

    console.log(action.type, {
        prevState,
        action,
        nextState
    });

    return returnValue;
};

interface K {
    FIND: string;
    SEARCH: string;
    SAVE: string;
    DELETE: string;
    ITEM_SELECTED: string;
    CLEAR_ITEM: string;
    SET_MODEL: string;
}

export function createDefaultConstants(key: string): K {

    let item: any = {};
    ['FIND', 'SEARCH', 'SAVE', 'DELETE', 'ITEM_SELECTED', 'SET_MODEL', 'CLEAR_ITEM'].forEach((k) => {
        item[k] = `${key}/${k}`;
    });
    return item;
}
