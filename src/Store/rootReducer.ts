import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootUsersSage } from './Users/users.saga';
import { usersListReducer } from './Users/users.reducer';

/**
 * Root reducer
 * 
 * This reducer combines multiple slice reducers, managing the global state for the application.
 * Example:
 * - For accessing user data, you would use `useSelector(state => state.users)`.
 * - For dispatching an action to fetch user data, you would call `dispatch(fetchUsers())` in the hooks file.
 * 
*  Individual reducers are obtained as follows:
 * - The `combineReducers` function is used to merge multiple slice reducers into a single 
 *   root reducer. For example, `usersListReducer` is imported and included in the 
 *   `rootReducer`.
 * 
 * Middleware:
 * - The `sagaMiddleware` is created using `createSagaMiddleware()` and added to the store 
 *   middleware during store configuration.
 * - The `configureStore` function is used to set up the Redux store, applying the root reducer 
 *   and any additional middleware.
 */

const sagaMiddleware = createSagaMiddleware();

/**
 *  Add your reducers from from each API group here.
 */
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
