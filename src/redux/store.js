import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import nameReducer from './name/nameReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  name: nameReducer
});

const store = configureStore({reducer: rootReducer});

export default store;