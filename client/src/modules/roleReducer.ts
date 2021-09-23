import Role from '@/entities/Role';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface RoleReducerState {
    roleList: BasicCall & {
        roles: Role[] | null,
    },
}

const initialState: RoleReducerState = {
    roleList: {
        loading: false,
        success: false,
        loaded: false,
        roles: null,
    }
}

const getRoles = createAsyncThunk('role/getRoles', async () => {
    return await client.get<BasicResponse & { role_list: Role[] }>('/role/list')
        .then(res => {
            return getBasicDataPayload(res.data.role_list);
        })
        .catch(err => {
            return getBasicErrorPayloadAxios<Role[]>(err);
        });
});

const RoleReducerSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        resetRoleReducer() {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getRoles.pending, (state) => {
                state.roleList = initialState.roleList;
                state.roleList.loading = true;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.roleList.loading = false;
                state.roleList.loaded = true;
                state.roleList.success = action.payload.success;
                state.roleList.roles = action.payload.data || null;
            })
            .addCase(getRoles.rejected, (state) => {
                state.roleList.loading = false;
                state.roleList.loaded = true;
            })
    }
});

export const { resetRoleReducer } = RoleReducerSlice.actions;

export default RoleReducerSlice.reducer;
