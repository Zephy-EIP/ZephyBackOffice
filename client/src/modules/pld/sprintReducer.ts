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
    updateData: BasicCall,
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
    updateData: {
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
    async () => {
        return await client.get<{sprintNames: string[]}>('/sprint/list/names')
            .then(res => {
                return getBasicDataPayload(res.data);
            }).catch(err => {
                return getBasicErrorPayloadAxios<{sprintNames: string[]}>(err);
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
            return {...state, updateData: state.updateData};
        }
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
            .addCase(updateSprintData.pending, (state) => {
                return {...state, updateData: {...initialState.updateData, loading: true}};
            })
            .addCase(updateSprintData.fulfilled, (state, action) => {
                state.updateData.loading = false;
                state.updateData.loaded = true;
                state.updateData.success = action.payload.success;
            })
            .addCase(updateSprintData.rejected, (state) => {
                state.updateData.loading = false;
                state.updateData.loaded = true;
            })
    }
});

export const { resetSprint, resetSprintUpdateData } = SprintSlice.actions;

export default SprintSlice.reducer;
