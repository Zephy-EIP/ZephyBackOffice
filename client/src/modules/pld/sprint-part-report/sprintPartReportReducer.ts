import { SprintPartReport } from '@/entities/SprintPartReport';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface SprintPartReportState {
    list: BasicCall & {
        list?: SprintPartReport[],
    },
    create: BasicCall,
    update: BasicCall,
    delete: BasicCall,
}

const initialState: SprintPartReportState = {
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
    update: {
        loading: false,
        success: false,
        loaded: false,
    },
    delete: {
        loading: false,
        success: false,
        loaded: false,
    },
}

export const getSprintPartReportList = createAsyncThunk(
    'sprint-part-report/list',
    async () => {
        return client.get<{sprList: SprintPartReport[]}>('/sprint-part-report/list')
            .then(res => getBasicDataPayload(res.data.sprList))
            .catch(err => getBasicErrorPayloadAxios<SprintPartReport[]>(err));
    }
)

export const createSprintPartReport = createAsyncThunk(
    'sprint-part-report/create',
    async (args: {
        sprintPartId: number,
        memberName: string,
        report: string,
    }) => {
        return client.post<BasicResponse>('/sprint-part-report', {
            sprint_part_id: args.sprintPartId,
            member_name: args.memberName,
            report: args.report,
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err));
    }
)

export const updateSprintPartReport = createAsyncThunk(
    'sprint-part-report/update',
    async (args: {
        sprintPartId: number,
        memberName: string,
        report: string,
    }) => {
        return client.put<BasicResponse>('/sprint-part-report', {
            sprint_part_id: args.sprintPartId,
            member_name: args.memberName,
            report: args.report,
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err));
    }
)

export const deleteSprintPartReport = createAsyncThunk(
    'sprint-part-report/delete',
    async (args: {
        sprintPartId: number,
        memberName: string,
    }) => {
        return client.delete<BasicResponse>('/sprint-part-report', {
            data: {
                sprint_part_id: args.sprintPartId,
                member_name: args.memberName,
            }
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err));
    }
)

const SprintPartReportSlice = createSlice({
    name: 'sprint-part-report',
    initialState,
    reducers: {
        resetSprintPartReport() {
            return initialState;
        },
        resetSprintPartReportCreate(state) {
            return {...state, create: initialState.create};
        },
        resetSprintPartReportUpdate(state) {
            return {...state, update: initialState.update};
        },
        resetSprintPartReportDelete(state) {
            return {...state, delete: initialState.delete};
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getSprintPartReportList.pending, state => {
                return {...state, list: {...initialState.list, loading: true}};
            })
            .addCase(getSprintPartReportList.fulfilled, (state, action) => {
                state.list.loading = false;
                state.list.loaded = true;
                state.list.success = true;
                state.list.list = action.payload.data;
            })
            .addCase(getSprintPartReportList.rejected, state => {
                state.list.loading = false;
                state.list.loaded = true;
            })
            .addCase(createSprintPartReport.pending, state => {
                return {...state, create: {...initialState.create, loading: true}};
            })
            .addCase(createSprintPartReport.fulfilled, state => {
                state.create.loading = false;
                state.create.loaded = true;
                state.create.success = true;
            })
            .addCase(createSprintPartReport.rejected, state => {
                state.create.loading = false;
                state.create.loaded = true;
            })
            .addCase(updateSprintPartReport.pending, state => {
                return {...state, update: {...initialState.update, loading: true}};
            })
            .addCase(updateSprintPartReport.fulfilled, state => {
                state.update.loading = false;
                state.update.loaded = true;
                state.update.success = true;
            })
            .addCase(updateSprintPartReport.rejected, state => {
                state.update.loading = false;
                state.update.loaded = true;
            })
            .addCase(deleteSprintPartReport.pending, state => {
                return {...state, delete: {...initialState.delete, loading: true}};
            })
            .addCase(deleteSprintPartReport.fulfilled, state => {
                state.delete.loading = false;
                state.delete.loaded = true;
                state.delete.success = true;
            })
            .addCase(deleteSprintPartReport.rejected, state => {
                state.delete.loading = false;
                state.delete.loaded = true;
            })

    }
});

export const { resetSprintPartReport } = SprintPartReportSlice.actions;

export default SprintPartReportSlice.reducer;
