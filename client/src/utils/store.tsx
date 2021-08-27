import authReducer from "@/modules/login/authReducer";
import { combineReducers, createStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer);

export default store;

