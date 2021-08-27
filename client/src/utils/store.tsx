import authReducer from "@/modules/login/authReducer";
import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>

export function useThunkDispatch() {
    return useDispatch<typeof store.dispatch>();
}

export default store;

