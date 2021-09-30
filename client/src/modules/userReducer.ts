import User from '@/entities/User';
import { BasicCall } from '@/utils/reducerUtils';
import client from '@/utils/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';

interface UserState {
    user: BasicCall & {
        user: User | null
    },
    userList: BasicCall & {
        users: User[] | null
    },
}

const initialState: UserState = {
    user: {
        loading: false,
        success: false,
        loaded: false,
        user: null,
    },
    userList: {
        loading: false,
        success: false,
        loaded: false,
        users: null,
    },
}

interface UserResponse {
    user: User
}

interface UserListResponse {
    users: User[]
}

export const getUser = createAsyncThunk(
    'user/get',
    async () => {
        const res = await client.get<UserResponse>('/user').catch(_err => { return null; });
        if (res === null)
            return null;
        return res.data.user;
    }
);

export const getUserList = createAsyncThunk(
    'user/list',
    async () => {
        return await client.get<UserListResponse>('/user/list')
            .then(res => {
                return getBasicDataPayload(res.data.users);
            })
            .catch(err => {
                return getBasicErrorPayloadAxios<User[]>(err);
            });
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetAllUser() {
            return initialState;
        },
        resetUser(state) {
            state.user = initialState.user;
        },
        resetUserList(state) {
            state.userList = initialState.userList;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, (state) => {
                state.user = { ...initialState.user, loading: true };
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.loaded = true;
                state.user.success = action !== null;
                state.user.user = action.payload;
            })
            .addCase(getUser.rejected, (state) => {
                state.user = { ...initialState.user, loaded: true };
            })
            .addCase(getUserList.pending, state => {
                state.userList = { ...initialState.userList, loading: true };
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.userList.loading = false;
                state.userList.loaded = true;
                state.userList.success = action.payload.success;
                state.userList.users = action.payload.data || null;
            })
            .addCase(getUserList.rejected, (state) => {
                state.userList = { ...initialState.userList, loaded: true };
            })
    }
});

export const { resetAllUser, resetUser, resetUserList } = userSlice.actions;

export default userSlice.reducer;
