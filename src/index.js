import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
//redux stuff
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import CandidateReducer from './store/reducers/candidate'

import App from './App';

const rootReducer = combineReducers({
  candidate: CandidateReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
