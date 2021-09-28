import Role from '@/entities/Role';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface RoleReducerState {
    roleList: BasicCall & {
        roles: Role[] | null,
    },
    updateRole: BasicCall & {
        role: Role | null,
    },
    deleteRole: BasicCall,
    createRole: BasicCall,
}

const initialState: RoleReducerState = {
    roleList: {
        loading: false,
        success: false,
        loaded: false,
        roles: null,
    },
    updateRole: {
        loading: false,
        success: false,
        loaded: false,
        role: null,
    },
    deleteRole: {
        loading: false,
        success: false,
        loaded: false,
    },
    createRole: {
        loading: false,
        success: false,
        loaded: false,
    },
}

export const getRoles = createAsyncThunk('role/getRoles', async () => {
    return await client.get<BasicResponse & { role_list: Role[] }>('/role/list')
        .then(res => {
            return getBasicDataPayload(res.data.role_list);
        })
        .catch(err => {
            return getBasicErrorPayloadAxios<Role[]>(err);
        });
});

export const updateRole = createAsyncThunk('role/updateRole', async (args: {
    roleId: number,
    displayName?: string,
    importance?: number,
}) => {
    type RoleResponse = BasicResponse & { role: Role };

    return await client.put<RoleResponse>('/role', {
        role_id: args.roleId,
        name: args.displayName,
        importance: args.importance,
    }).then(res => {
        return getBasicDataPayload(res.data.role);
    }).catch(err => {
        return getBasicErrorPayloadAxios<Role>(err);
    });
})

export const createRole = createAsyncThunk('role/createRole', async (args: {
    roleId: number,
    displayName?: string,
    importance?: number,
}) => {
    type RoleResponse = BasicResponse & { role: Role };

    return await client.put<RoleResponse>('/role', {
        role_id: args.roleId,
        name: args.displayName,
        importance: args.importance,
    }).then(res => {
        return getBasicDataPayload(res.data.role);
    }).catch(err => {
        return getBasicErrorPayloadAxios<Role>(err);
    });
})

export const deleteRole = createAsyncThunk('role/deleteRole', async (args: {
    roleId: number,
}) => {
    return await client.delete<BasicResponse>('/role', {
        data: {
            role_id: args.roleId,
        }
    }).then(_res => {
        return getBasicDataPayload();
    }).catch(err => {
        return getBasicErrorPayloadAxios<BasicResponse>(err);
    });
})

const RoleReducerSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        resetRoleReducer() {
            return initialState;
        },
        resetGetRoleList(state) {
            state.roleList = initialState.roleList;
        },
        resetUpdateRole(state) {
            state.updateRole = initialState.updateRole;
        },
        resetCreateRole(state) {
            state.createRole = initialState.createRole;
        },
        resetDeleteRole(state) {
            state.deleteRole = initialState.deleteRole;
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
            .addCase(updateRole.pending, (state) => {
                state.updateRole = initialState.updateRole;
                state.updateRole.loading = true;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.updateRole.loading = false;
                state.updateRole.loaded = true;
                state.updateRole.success = action.payload.success;
                state.updateRole.role = action.payload.data || null;
            })
            .addCase(updateRole.rejected, (state) => {
                state.updateRole.loading = false;
                state.updateRole.loaded = true;
                state.updateRole.success = false;
            })
            .addCase(createRole.pending, (state) => {
                state.createRole = initialState.createRole;
                state.createRole.loading = true;
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.createRole.loading = false;
                state.createRole.loaded = true;
                state.createRole.success = action.payload.success;
            })
            .addCase(createRole.rejected, (state) => {
                state.createRole.loading = false;
                state.createRole.loaded = true;
                state.createRole.success = false;
            })
            .addCase(deleteRole.pending, (state) => {
                state.deleteRole = initialState.deleteRole;
                state.deleteRole.loading = true;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.deleteRole.loading = false;
                state.deleteRole.loaded = true;
                state.deleteRole.success = action.payload.success;
            })
            .addCase(deleteRole.rejected, (state) => {
                state.deleteRole.loading = false;
                state.deleteRole.loaded = true;
                state.deleteRole.success = false;
            })
    }
});

export const {
    resetRoleReducer,
    resetCreateRole,
    resetDeleteRole,
    resetGetRoleList,
    resetUpdateRole
} = RoleReducerSlice.actions;

export default RoleReducerSlice.reducer;
