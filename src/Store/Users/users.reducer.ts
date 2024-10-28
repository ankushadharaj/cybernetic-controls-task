import { createReducer } from "@reduxjs/toolkit";

import * as UserActions from './users.action';

import { Users } from '../../Types/Users/Users.type';
import { InitialState } from "../../Types/Store.type";

/**
 * Reducer
 * 
 * Individual reducer for each API group. There reducers are combined to form the root reducer. 
 * Add cased for each action described in Actions. 
 * 
 */
const initialState: InitialState<Users> = {
    data: undefined,
    isLoading: true,
    isFetched: false,
    isError: false,
    currentPage: 0,
    hasMore: true,
    error: null
};

export const usersListReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(UserActions.getUsersListRequest, (state) => ({ ...state, isLoading: true, isError: false, error: null }))
        .addCase(UserActions.getUsersListSuccess, (state, action) => {
            const data = state.data ? [...state.data, ...action.payload.data] : [...action.payload.data]
            return { 
                ...state,
                data, 
                isLoading: false, 
                isFetched: true, 
                isError: false, 
                error: null,
                currentPage: state.currentPage + 1,
                hasMore: action.payload.hasMore
            }
        })
        .addCase(UserActions.getUsersListFailure, (state, action) => ({ ...state, isLoading: false, isError: true, error: action.payload }));
});