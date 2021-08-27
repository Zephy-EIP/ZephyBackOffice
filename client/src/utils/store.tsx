import authReducer from "@/modules/login/authReducer";
import { combineReducers, createStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>

export default store;

