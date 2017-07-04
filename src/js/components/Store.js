export const createStore = (initialState = {}) => {
    let state = initialState;
    let listeners = [];
    
    return {
        getState: () => state,
        setState: newState => {
            state = {
                ...state,
                ...newState
            }

            listeners.forEach( l => l() )
        },
        subscribe: l => {
            listeners = [
                ...listeners,
                l
            ]
        }
    }
}
