import { put, takeLatest, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { axiosClient } from '../../Axios/axiosClient';
import { MAX_NO_OF_RETRIES, PAGE_LIMIT } from '../../Constants/DataFetch.constants';
import * as UserActions from './users.action';

import { GetUserListResponse, Users } from '../../Types/Users/Users.type';

function* getUsersList(){
    let skip = 0;
    let noOfRetries = 0;
    let total: number | null = null;
    let usersFetched = 0;
    const users: Users = [];

    while(total === null || usersFetched < total) {
        try {
            const response: AxiosResponse<GetUserListResponse> = yield axiosClient.get(`users?limit=${PAGE_LIMIT}&skip=${skip}`);    
            
            users.push(...response.data.users)
            total = response.data.total;
            usersFetched += response.data.users.length;
            skip += PAGE_LIMIT;
            noOfRetries = 0;

            if(usersFetched >= total) {
                yield put({ type: UserActions.getUsersListSuccess.type, payload: users });
                return;
            }
        } catch(error: any) {
            noOfRetries++;

            if(noOfRetries >= MAX_NO_OF_RETRIES) {
                yield put({ type: UserActions.getUsersListFailure.type, payload: error.message });
                return;
            }
        }
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