import { store } from "../Store/rootReducer";


export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export interface InitialState<T> {
    data: T | undefined,
    isLoading: boolean,
    isError: boolean,
    error?: any | null
};


