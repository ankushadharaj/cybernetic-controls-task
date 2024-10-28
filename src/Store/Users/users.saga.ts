import { put, takeLatest, all, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { axiosClient } from '../../Axios/axiosClient';
import { PAGE_LIMIT } from '../../Constants/DataFetch.constants';
import * as UserActions from './users.action';

import { GetUserListResponse } from '../../Types/Users/Users.type';

/**
 * Sagas
 * 
 * Sagas are used to handle side effects in the application, particularly for managing 
 * asynchronous operations like API calls.
 * 
 */

function* getUsersList(){
    const { currentPage } = yield select((state) => {
        return state.users
    });

    try {
        const response: AxiosResponse<GetUserListResponse> = yield axiosClient.get(`users?limit=${PAGE_LIMIT}&skip=${currentPage * PAGE_LIMIT}`); 
        yield put({ 
            type: UserActions.getUsersListSuccess.type, 
            payload: { 
                data: response.data.users, 
                hasMore: response.data.total > currentPage * PAGE_LIMIT + PAGE_LIMIT 
            } 
        });
    } catch(error: any) {
        yield put({ type: UserActions.getUsersListFailure.type, payload: error.message });
    }    
}

function* watchGetUsersList() {
    yield takeLatest(UserActions.getUsersListRequest.type, getUsersList);
}

export function* rootUsersSage(){
    yield all([
        watchGetUsersList()
    ]);
}