import React from 'react';
import { Provider } from 'react-redux'

import UserList from './Components/UserList/UserList';

import { store } from './Store/rootReducer';

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <UserList />      
      </div>
    </Provider>
  )
}

export default App
