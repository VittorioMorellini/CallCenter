import React, { useMemo, Reducer, useReducer } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import { Theme } from '@mui/material';
import { useParams } from 'react-router';
import { EntityLoaderInitialState } from '../core/reducer';

export function useWidth() {
    const theme: Theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: any, key: any) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.only(key));
            return !output && matches ? key : output;
        },          null) || 'xs'
    );
}

type DummyUpdateType = {}
export function useForceUpdate() {

    const [, updateState] = React.useState<DummyUpdateType>();
    return React.useCallback(() => updateState({}), []);
}

export function useFormItem<T>(initialValue: T): [T, (obj: T) => void] {

    const [item, setItem] = React.useState(initialValue);
    React.useEffect(() => { setItem(initialValue); }, [initialValue]);
    
    // è  necessario per forzare un rerendering del componente, altrimenti dovrei clonare ogni volta l'item
    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);
    const forceUpdate = useForceUpdate();

    return [
        item,
        (obj: T) => {
            setItem(obj);
            forceUpdate();
        }
    ];
}

export function useDetailMode (item: any) {
    
    const params = useParams<{id: string}>();
    let id = item?.id || params.id;
    return useMemo(() => {
        let isInsert = id === undefined || id === null || id === '0' || id === 'undefined';
        return {
            id,
            isInsert,
            isUpdate: !isInsert
        }
    }, [id]);
}

export function useLocalReducer <S> (reducer: Reducer<S, any>, initialState: any) {

    const [state, dispatch] = useReducer(
        reducer, 
        undefined, //EntityLoaderInitialState(initialState),
        () => EntityLoaderInitialState(initialState)
    );

    const enhancedDispatch = applyLogMiddleware(() => state)(dispatch);

    return {
        state,
        dispatch: enhancedDispatch
    }
}

const applyLogMiddleware = (state: any) => (dispatch: any) => (action: any) => {
    
    // const prevState = state(); non si riesce ad avere il previous state
    
    const returnValue = dispatch(action);
    if (process.env.NODE_ENV === 'development') {
        const nextState = state();

        console.log(action.type, {
            action,
            nextState
        });
    }

    return returnValue;
};

// export function useLocalDispatch <R> () {

//     const dispatch = useDispatch();
//     const state = useSelector((root: R) => root);

//     const enhancedDispatch = applyLocalMiddleware(state)(dispatch);

//     return {
//         state,
//         dispatch: enhancedDispatch
//     }
// }

// const applyLocalMiddleware = (state: any) => (dispatch: any) => (action: any) => {
    
//     if (typeof action === 'function') {
//         return action(dispatch, state);
//     }
    
//     const returnValue = dispatch(action);
//     if (process.env.NODE_ENV === 'development') {
//         const nextState = state();

//         console.log(action.type, {
//             action,
//             nextState
//         });
//     }

//     return returnValue;
// };