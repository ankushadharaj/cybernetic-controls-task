import { store } from "../Store/rootReducer";


export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export interface InitialState<T> {
    data: T | undefined,
    isLoading: boolean,
    isFetched: boolean,
    isError: boolean,
    currentPage: number,
    hasMore: boolean,
    error?: any | null
};

export type DataHookType<T> = Omit<InitialState<T>,'isFetched' | 'currentPage' | 'hasMore'>; 

export interface SuccessPayload<T> {
    data: T,
    hasMore: boolean
}

export interface ResponseType {
    limit: number, 
    skip: number,
    total: number, 
}
