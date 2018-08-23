import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

import userReducer from './user/reducer';

const reducers = combineReducers({
  user: userReducer,
});

const composeEnhancers = composeWithDevTools({});

export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));