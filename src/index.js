import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './App';
import AuthReducer from './redux/AuthReducer'
import PostsReducer from './redux/PostReducer'
import reportWebVitals from './reportWebVitals';

import './index.css';


const rootReducers = combineReducers({
  auth: AuthReducer,
  posts: PostsReducer
})

const store = createStore(rootReducers, compose(
  applyMiddleware(thunk)
))

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
