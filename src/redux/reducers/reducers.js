import { combineReducers } from "redux";
import authReducer from "./signin.reducer";

export default combineReducers ({
    // mettre ici les reducers
    auth: authReducer,
});