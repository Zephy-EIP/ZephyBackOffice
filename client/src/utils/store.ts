import createAccountReducer from '@/modules/administration/createAccount/createAccountReducer';
import authReducer, { logout, unauthUser } from '@/modules/auth/authReducer';
import sprintReducer from '@/modules/pld/sprintReducer';
import changePasswordReducer from '@/modules/profile/changePassword/changePasswordReducer';
import roleReducer from '@/modules/roleReducer';
import userReducer from '@/modules/userReducer';
import userUpdateReducer from '@/modules/userUpdateReducer';
import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    passwordChange: changePasswordReducer,
    createAccount: createAccountReducer,
    role: roleReducer,
    userUpdate: userUpdateReducer,
    sprint: sprintReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === logout.fulfilled.toString() || action.type === unauthUser.toString()) {
        state = undefined;
    }
    return appReducer(state, action);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>

export function useThunkDispatch() {
    return useDispatch<typeof store.dispatch>();
}

export default store;
