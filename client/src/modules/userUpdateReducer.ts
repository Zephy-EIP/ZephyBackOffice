import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserUpdateReducerState {
    username: BasicCall,
    role: BasicCall,
}

const initialState: UserUpdateReducerState = {
    username: {
        loading: false,
        success: false,
        loaded: false,
    },
    role: {
        loading: false,
        success: false,
        loaded: false,
    },
}

export const changeUserUsername = createAsyncThunk(
    'userUpdate/username',
    async (args: {
        newUsername: string,
    }) => {
        return await client.put<BasicResponse>(
            '/user/username', {
                new_username: args.newUsername,
            }).then(_res => {
                return getBasicDataPayload();
            }).catch(err => {
                return getBasicErrorPayloadAxios(err)
            });
    }
);

export const changeUserRole = createAsyncThunk(
    'userUpdate/role',
    async (args: {
        userId: number,
        newRoleId: number
    }) => {
        return await client.put<BasicResponse>(
            '/user/set-role', {
                user_id: args.userId,
                role_id: args.newRoleId,
            }).then(_res => {
                return getBasicDataPayload();
            }).catch(err => {
                return getBasicErrorPayloadAxios(err)
            });
    }
);

const UserUpdateReducerSlice = createSlice({
    name: 'userUpdate',
    initialState,
    reducers: {
        resetUserUpdateReducer() {
            return initialState;
        },
        resetUserUpdateUsername(state) {
            state.username = initialState.username;
        },
        resetUserUpdateRole(state) {
            state.role = initialState.role;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(changeUserUsername.pending, (state) => {
                state.username = {...initialState.username, loading: true};
            })
            .addCase(changeUserUsername.fulfilled, (state, action) => {
                state.username.loaded = true;
                state.username.loading = false;
                state.username.success = action.payload.success;
            })
            .addCase(changeUserUsername.rejected, (state) => {
                state.username.loading = false;
                state.username.loaded = true;
            })
            .addCase(changeUserRole.pending, (state) => {
                state.role = {...initialState.username, loading: true};
            })
            .addCase(changeUserRole.fulfilled, (state, action) => {
                state.role.loaded = true;
                state.role.loading = false;
                state.role.success = action.payload.success;
            })
            .addCase(changeUserRole.rejected, (state) => {
                state.role.loading = false;
                state.role.loaded = true;
            })
    }
});

export const { resetUserUpdateReducer, resetUserUpdateUsername, resetUserUpdateRole } = UserUpdateReducerSlice.actions;

export default UserUpdateReducerSlice.reducer;
