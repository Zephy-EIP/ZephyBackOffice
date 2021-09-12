import { BasicCall } from '@/utils/reducerUtils';
import client from '@/utils/client';
import { setToken } from '@/utils/token';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userDataClear } from '@/utils/localStorageUtils';

interface AuthState  {
    login: BasicCall & {
        token: string | undefined
    },
    logout: BasicCall,
}

const initialState: AuthState = {
    login: {
        loading: false,
        success: false,
        loaded: false,
        token: undefined,
    },
    logout: {
        loading: false,
        success: false,
        loaded: false,
    },
};

export const login = createAsyncThunk(
    'auth/login',
    async (payload: {email: string, password: string}) => {
        const res = await client.post('/user/auth', payload).catch(_err => null);
        if (res === null || typeof res.data.token !== 'string')
            return null;
        const token: string = res.data.token;
        setToken(token);
        return token;
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await client.delete('/user/auth').catch(_err => null);
    setToken(null);
    userDataClear();
    return {success: true};
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state, _action) => {
                state.login = {...initialState.login, loading: true};
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login.loading = false;
                state.login.loaded = true;
                if (action.payload !== null) {
                    state.login.token = action.payload;
                    state.login.success = true;
                }
            })
            .addCase(logout.pending, (state, _action) => {
                state.logout = {...initialState.logout, loading: true};
            })
            .addCase(logout.fulfilled, (state, _action) => {
                state.logout = {...initialState.logout, loaded: true, success: true};
            });
    },
});

export default authSlice.reducer;
