import { createAction } from '@reduxjs/toolkit';

import { Users } from '../../Types/Users/Users.type';
import { SuccessPayload } from '../../Types/Store.type';

/**
 * Actions
 * 
 * This section defines the action types and creators used to manage asynchronous API calls 
 * within the application.
 * 
 * Action Types:
 * - The action types are defined using a consistent naming convention for clarity and ease 
 *   of use:
 *   - <METHOD>_<API>_REQUEST: Initiates the API call.
 *   - <METHOD>_<API>_SUCCESS: Indicates a successful API call and contains the response data.
 *   - <METHOD>_<API>_FAILURE: Indicates that the API call has failed and contains the error 
 *     information.
 * 
 */

const GET_USERS_LIST_REQUEST = 'GET_USERS_LIST_REQUEST';
const GET_USERS_LIST_SUCCESS = 'GET_USERS_LIST_SUCCESS';
const GET_USERS_LIST_FAILURE = 'GET_USERS_LIST_FAILURE';


const getUsersListRequest = createAction(GET_USERS_LIST_REQUEST);
const getUsersListSuccess = createAction<SuccessPayload<Users>>(GET_USERS_LIST_SUCCESS);
const getUsersListFailure = createAction<any>(GET_USERS_LIST_FAILURE);

export { getUsersListRequest, getUsersListSuccess, getUsersListFailure };