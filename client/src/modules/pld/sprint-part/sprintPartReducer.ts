import SprintPart from '@/entities/SprintPart';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface SprintPartState {
    list: BasicCall & {
        list?: SprintPart[],
    },
    create: BasicCall,
    delete: BasicCall,
    update: BasicCall,
}

const initialState: SprintPartState = {
    list: {
        loading: false,
        success: false,
        loaded: false,
    },
    create: {
        loading: false,
        success: false,
        loaded: false,
    },
    delete: {
        loading: false,
        success: false,
        loaded: false,
    },
    update: {
        loading: false,
        success: false,
        loaded: false,
    },
}

export const createSprintPart = createAsyncThunk(
    'sprint-part/create',
    async (args: {sprintName: string, title: string, description: string, partType: 'KO' | 'FU' | 'FU2' | 'D'}) => {
        return await client.post<BasicResponse>('/sprint-part', {
            sprint_name: args.sprintName,
            title: args.title,
            description: args.description,
            part_type: args.partType,
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err))
    });

export const getSprintPartList = createAsyncThunk(
    'sprint-part/list',
    async () => {
        return await client.get<{sprintParts: SprintPart[]}>('/sprint-part/list')
            .then(res => getBasicDataPayload(res.data.sprintParts))
            .catch(err => getBasicErrorPayloadAxios<SprintPart[]>(err))
    });

export const deleteSprintPart = createAsyncThunk(
    'sprint-part/delete',
    async (args: {id: number}) => {
        return await client.delete<BasicResponse>('/sprint-part', {
            data: { id: args.id }
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err))
    });

export const updateSprintPart = createAsyncThunk(
    'sprint-part/update',
    async (args: {id: number, title: string, description: string}) => {
        return await client.put<BasicResponse>('/sprint-part', {
            id: args.id,
            title: args.title,
            description: args.description,
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err))
    });

const SprintPartSlice = createSlice({
    name: 'sprint-part',
    initialState,
    reducers: {
        resetSprintPart() {
            return initialState;
        },
        resetSprintPartCreate(state) {
            return {...state, create: initialState.create};
        },
        resetSprintPartUpdate(state) {
            return {...state, update: initialState.update};
        },
        resetSprintPartDelete(state) {
            return {...state, delete: initialState.delete};
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createSprintPart.pending, state => {
                return {...state, create: {...initialState.create, loading: true}};
            })
            .addCase(createSprintPart.fulfilled, state => {
                state.create.loading = false;
                state.create.loaded = true;
                state.create.success = true;
            })
            .addCase(createSprintPart.rejected, state => {
                state.create.loading = false;
                state.create.loaded = true;
            })
            .addCase(getSprintPartList.pending, state => {
                return {...state, list: {...initialState.list, loading: true}};
            })
            .addCase(getSprintPartList.fulfilled, (state, action) => {
                state.list.loading = false;
                state.list.loaded = true;
                state.list.success = true;
                state.list.list = action.payload.data;
            })
            .addCase(getSprintPartList.rejected, state => {
                state.list.loading = false;
                state.list.loaded = true;
            })
            .addCase(deleteSprintPart.pending, state => {
                return {...state, delete: {...initialState.delete, loading: true}};
            })
            .addCase(deleteSprintPart.fulfilled, state => {
                state.delete.loading = false;
                state.delete.loaded = true;
                state.delete.success = true;
            })
            .addCase(deleteSprintPart.rejected, state => {
                state.delete.loading = false;
                state.delete.loaded = true;
            })
            .addCase(updateSprintPart.pending, state => {
                return {...state, update: {...initialState.update, loading: true}};
            })
            .addCase(updateSprintPart.fulfilled, state => {
                state.update.loading = false;
                state.update.loaded = true;
                state.update.success = true;
            })
            .addCase(updateSprintPart.rejected, state => {
                state.update.loading = false;
                state.update.loaded = true;
            })
    }
});

export const {
    resetSprintPart,
    resetSprintPartCreate,
    resetSprintPartDelete,
    resetSprintPartUpdate
} = SprintPartSlice.actions;

export default SprintPartSlice.reducer;
