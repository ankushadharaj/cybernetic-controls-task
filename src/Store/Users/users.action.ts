import { createAction } from '@reduxjs/toolkit';

import { Users } from '../../Types/Users/Users.type';
import { SuccessPayload } from '../../Types/Store.type';

const GET_USERS_LIST_REQUEST = 'GET_USERS_LIST_REQUEST';
const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
const GET_USERS_LIST_FAILURE = 'GET_USERS_LIST_FAILURE';


const getUsersListRequest = createAction(GET_USERS_LIST_REQUEST);
const getUsersListSuccess = createAction<SuccessPayload<Users>>(GET_USERS_LIST_SUCCESS);
const getUsersListFailure = createAction<any>(GET_USERS_LIST_FAILURE);

export { getUsersListRequest, getUsersListSuccess, getUsersListFailure };