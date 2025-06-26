// src/reducers/index.js
import { combineReducers } from 'redux';
import securityReducer from './securityReducer'; // or whatever reducers you have
import errorReducer from './errorReducer';
import qaReducer from './qaReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  security: securityReducer,
  errors: errorReducer,
  qa: qaReducer,
  question: questionReducer
});

export default rootReducer;
