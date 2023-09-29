import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer, // Ajoutez d'autres réducteurs ici si nécessaire
});

const store = configureStore({reducer: rootReducer});

export default store;