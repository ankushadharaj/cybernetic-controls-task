import { createReducer } from "@reduxjs/toolkit";

import * as UserActions from './users.action';

import { Users } from '../../Types/Users/Users.type';
import { InitialState } from "../../Types/Store.type";

const initialState: InitialState<Users> = {
    data: undefined,
    isLoading: true,
    isError: false,
    error: null
};

export const usersListReducer = createReducer(initialState, (builder) => {
    console.log('reducer', initialState);
    builder
        .addCase(UserActions.getUsersListRequest, (state) => ({ ...state, isLoading: true, isError: false, error: null }))
        .addCase(UserActions.getUsersListSuccess, (state, action) => ({ ...state, data: action.payload, isLoading: false, isError: false, error: null }))
        .addCase(UserActions.getUsersListFailure, (state, action) => ({ ...state, isLoading: false, isError: true, error: action.payload }));
});