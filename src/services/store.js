import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer';

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);
