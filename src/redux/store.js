import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import nameReducer from './name/nameReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  authReducer,
  nameReducer, // Ajoutez d'autres réducteurs ici si nécessaire
});

const store = configureStore({reducer: rootReducer});

export default store;