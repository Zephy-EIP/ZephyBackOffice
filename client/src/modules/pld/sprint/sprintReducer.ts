import Sprint from '@/entities/Sprint';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface SprintState {
    list: BasicCall & {
        list?: Sprint[]
    }
    listNames: BasicCall & {
        list?: string[]
    },
    createSprint: BasicCall & {error?: string},
    updateData: BasicCall & {error?: string},
    updateName: BasicCall,
    deleteSprint: BasicCall,
};

const initialState: SprintState = {
    list: {
        loading: false,
        success: false,
        loaded: false,
    },
    listNames: {
        loading: false,
        success: false,
        loaded: false,
    },
    createSprint: {
        loading: false,
        success: false,
        loaded: false,
    },
    updateData: {
        loading: false,
        success: false,
        loaded: false,
    },
    updateName: {
        loading: false,
        success: false,
        loaded: false,
    },
    deleteSprint: {
        loading: false,
        success: false,
        loaded: false,
    },
}

export const getSprintList = createAsyncThunk(
    'sprint/list',
    async () => {
        return await client.get<{sprints: Sprint[]}>('/sprint/list')
            .then(res => {
                return getBasicDataPayload(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<{sprints: Sprint[]}>(err);
            });
    }
)

export const getSprintListNames = createAsyncThunk(
    'sprint/listNames',
    async () => {
        return await client.get<{sprintNames: string[]}>('/sprint/list/names')
            .then(res => {
                return getBasicDataPayload(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<{sprintNames: string[]}>(err);
            });
    }
)

export const createSprint = createAsyncThunk(
    'sprint/createSprint',
    async (args: {sprintName: string, dataFile: File}) => {
        const data = new FormData();
        data.append('sprintFile', args.dataFile);
        data.append('sprint_name', args.sprintName);
        return await client.post<BasicResponse>('/sprint', data)
            .then(res => {
                return getBasicDataPayload(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<BasicResponse>(err, err.response?.data);
            });
    }
)

export const updateSprintData = createAsyncThunk(
    'sprint/updateSprintData',
    async (args: {sprintName: string, dataFile: File}) => {
        const data = new FormData();
        data.append('sprintFile', args.dataFile);
        data.append('sprint_name', args.sprintName);
        return await client.put<BasicResponse>('/sprint/data', data)
            .then(res => {
                return getBasicDataPayload<BasicResponse>(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<BasicResponse>(err, err.response.data);
            });
    });

export const updateSprintName = createAsyncThunk(
    'sprint/updateSprintName',
    async (args: {sprintName: string, newName: string}) => {
        return await client.put<BasicResponse>('/sprint/name', {
            sprint_name: args.sprintName,
            new_sprint_name: args.newName,
        })
            .then(res => {
                return getBasicDataPayload<BasicResponse>(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<BasicResponse>(err);
            });
    });

export const deleteSprint = createAsyncThunk(
    'sprint/delete',
    async (args: {sprintName: string}) => {
        return await client.delete<BasicResponse>('/sprint', {
            data: {
                sprint_name: args.sprintName,
            }
        })
            .then(res => {
                return getBasicDataPayload(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<BasicResponse>(err);
            });
    });

const SprintSlice = createSlice({
    name: 'sprint',
    initialState,
    reducers: {
        resetSprint() {
            return initialState;
        },
        resetSprintUpdateData(state) {
            return {...state, updateData: initialState.updateData};
        },
        resetCreateSprint(state) {
            return {...state, createSprint: initialState.createSprint};
        },
        resetSprintUpdateName(state) {
            return {...state, updateName: initialState.updateName};
        },
        resetDeleteSprint(state) {
            return {...state, deleteSprint: initialState.deleteSprint};
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getSprintList.pending, (state) => {
                return {...state, list: {...initialState.list, loading: true}};
            })
            .addCase(getSprintList.fulfilled, (state, action) => {
                state.list.loading = false;
                state.list.loaded = true;
                state.list.success = action.payload.success;
                state.list.list = action.payload.data?.sprints;
            })
            .addCase(getSprintList.rejected, (state) => {
                state.list.loading = false;
                state.list.loaded = true;
            })
            .addCase(getSprintListNames.pending, (state) => {
                return {...state, listNames: {...initialState.listNames, loading: true}};
            })
            .addCase(getSprintListNames.fulfilled, (state, action) => {
                state.listNames.loading = false;
                state.listNames.loaded = true;
                state.listNames.success = action.payload.success;
                state.listNames.list = action.payload.data?.sprintNames;
            })
            .addCase(getSprintListNames.rejected, (state) => {
                state.listNames.loading = false;
                state.listNames.loaded = true;
            })
            .addCase(createSprint.pending, (state) => {
                return {...state, createSprint: {...initialState.createSprint, loading: true}};
            })
            .addCase(createSprint.fulfilled, (state, action) => {
                state.createSprint.loading = false;
                state.createSprint.loaded = true;
                state.createSprint.success = action.payload.success;
                state.createSprint.error = action.payload.data?.message;
            })
            .addCase(createSprint.rejected, (state) => {
                state.createSprint.loading = false;
                state.createSprint.loaded = true;
            })
            .addCase(updateSprintData.pending, (state) => {
                return {...state, updateData: {...initialState.updateData, loading: true}};
            })
            .addCase(updateSprintData.fulfilled, (state, action) => {
                state.updateData.loading = false;
                state.updateData.loaded = true;
                state.updateData.success = action.payload.success;
                state.updateData.error = action.payload.data?.message;
            })
            .addCase(updateSprintData.rejected, (state) => {
                state.updateData.loading = false;
                state.updateData.loaded = true;
            })
            .addCase(updateSprintName.pending, (state) => {
                return {...state, updateName: {...initialState.updateName, loading: true}};
            })
            .addCase(updateSprintName.fulfilled, (state, action) => {
                state.updateName.loading = false;
                state.updateName.loaded = true;
                state.updateName.success = action.payload.success;
            })
            .addCase(updateSprintName.rejected, (state) => {
                state.updateName.loading = false;
                state.updateName.loaded = true;
            })
            .addCase(deleteSprint.pending, (state) => {
                return {...state, deleteSprint: {...initialState.deleteSprint, loading: true}};
            })
            .addCase(deleteSprint.fulfilled, (state, action) => {
                state.deleteSprint.loading = false;
                state.deleteSprint.loaded = true;
                state.deleteSprint.success = action.payload.success;
            })
            .addCase(deleteSprint.rejected, (state) => {
                state.deleteSprint.loading = false;
                state.deleteSprint.loaded = true;
            })
    }
});

export const { resetSprint, resetSprintUpdateData, resetSprintUpdateName, resetCreateSprint, resetDeleteSprint } = SprintSlice.actions;

export default SprintSlice.reducer;
