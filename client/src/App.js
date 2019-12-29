import React from 'react';

//Import the modified App.css
import './App.css';

// Import the Routes component, which contains our Route setup

import { Routes } from './Routes'


// Provider component is a react-redux component for setting up the Redux Store

import { Provider } from 'react-redux'

// Import the ConfigureStore that holds the initial Configuration

import { configureStore } from './store/configureStore'


// Create a Store from the Configuration, we can pass a Initial State here

const store = configureStore()

const App = (props) => {
  return (
    
    //Provider needs to contain all the Containers/Components it will give access to the Store

      <Provider store={store} >
        <Routes />
      </Provider>
  )
}

export default App;
