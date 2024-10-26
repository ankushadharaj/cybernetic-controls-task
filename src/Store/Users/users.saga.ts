import { put, takeLatest, all } from 'redux-saga/effects';

import { axiosClient } from '../../Axios/axiosClient';
import * as UserActions from './users.action';

import { InitialState } from '../../Types/Store.type';
import { Users } from '../../Types/Users/Users.type';

function* getUsersList(){
    try {
        const response: InitialState<Users> = yield axiosClient.get('users');
        yield put({ type: UserActions.getUsersListSuccess.type, payload: response.data })
    } catch(error: any) {
        yield put({ type: UserActions.getUsersListFailure.type, payload: error.message })
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