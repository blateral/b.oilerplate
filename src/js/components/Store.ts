export interface Store<S> {
    getState: () => S;
    setState: (newState: S) => void;
    subscribe: (fn: Function) => void;
}

export const createStore = <S>(initialState: S): Store<S> => {
    let state = initialState;
    let listeners: Array<Function> = [];

    return {
        getState: () => state,
        setState: (newState: S) => {
            state = {
                ...state,
                ...newState,
            };

            listeners.forEach(l => l());
        },
        subscribe: (l: Function) => {
            listeners = [...listeners, l];
        },
    };
};
