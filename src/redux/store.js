import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Importez votre rootReducer ici
import thunk from 'redux-thunk'; // Importez Redux Thunk

const store = configureStore({
  reducer: rootReducer, // Utilisez votre rootReducer ici
  middleware: [thunk],
});

export default store;
