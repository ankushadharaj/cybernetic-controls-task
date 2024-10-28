import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootUsersSage } from './Users/users.saga';
import { usersListReducer } from './Users/users.reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    users: usersListReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => {
        const customMiddleware = getDefaultMiddleware().concat(sagaMiddleware);
        return customMiddleware;
      }
})

sagaMiddleware.run(rootUsersSage);

export { store };
