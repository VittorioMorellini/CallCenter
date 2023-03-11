export default (store: any) => (next: any) => (action: any) => {
    
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