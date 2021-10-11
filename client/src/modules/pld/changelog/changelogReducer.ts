import { Changelog } from '@/entities/Changelog';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ChangelogState{
    list: BasicCall & {
        list?: Changelog[],
    },
    create: BasicCall,
    update: BasicCall,
    delete: BasicCall,
}

const initialState: ChangelogState = {
    list: {
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
    create: {
        loading: false,
        success: false,
        loaded: false,
    },
}

export const getChangelogList = createAsyncThunk(
    'changelog/list',
    async () => {
        return client.get<{changelog: Changelog[]}>('/changelog/list')
            .then(res => getBasicDataPayload(res.data.changelog))
            .catch(err => getBasicErrorPayloadAxios<Changelog[]>(err));
    }
);

export const createChangelog = createAsyncThunk(
    'changelog/create',
    async (args: {
        author: string,
        version: string,
        sections: string,
        comments: string,
    }) => {
        return client.post<{createLog: Changelog}>('/changelog', {
            author: args.author,
            version: args.version,
            sections: args.sections,
            comments: args.comments,
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err));
    }
);

export const updateChangelog = createAsyncThunk(
    'changelog/update',
    async (args: {
        author: string,
        version: string,
        sections: string,
        comments: string,
        date: string,
        id: number,
    }) => {
        return client.put<BasicResponse>('/changelog', {
            author: args.author,
            version: args.version,
            sections: args.sections,
            comments: args.comments,
            date: args.date,
            id: args.id,
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err));
    }
);

export const deleteChangelog = createAsyncThunk(
    'changelog/delete',
    async (args: {
        id: number,
    }) => {
        return client.delete<BasicResponse>('/changelog', {
            data: {
                id: args.id,
            }
        })
            .then(_res => getBasicDataPayload())
            .catch(err => getBasicErrorPayloadAxios(err));
    }
);

const ChangelogSlice = createSlice({
    name: 'changelog',
    initialState,
    reducers: {
        resetChangelog() {
            return initialState;
        },
        resetChangelogCreate(state) {
            return {...state, create: initialState.create};
        },
        resetChangelogUpdate(state) {
            return {...state, update: initialState.update};
        },
        resetChangelogDelete(state) {
            return {...state, delete: initialState.delete};
        },
    },

    extraReducers: builder => {
        builder
            .addCase(getChangelogList.pending, state => {
                return {...state, list: {...initialState.list, loading: true}};
            })
            .addCase(getChangelogList.fulfilled, (state, action) => {
                state.list.loading = false;
                state.list.loaded = true;
                state.list.success = true;
                state.list.list = action.payload.data;
            })
            .addCase(getChangelogList.rejected, state => {
                state.list.loading = false;
                state.list.loaded = true;
            })

            .addCase(createChangelog.pending, state => {
                return {...state, create: {...initialState.create, loading: true}};
            })
            .addCase(createChangelog.fulfilled, (state) => {
                state.create.loading = false;
                state.create.loaded = true;
                state.create.success = true;
            })
            .addCase(createChangelog.rejected, state => {
                state.create.loading = false;
                state.create.loaded = true;
            })

            .addCase(updateChangelog.pending, state => {
                return {...state, update: {...initialState.update, loading: true}};
            })
            .addCase(updateChangelog.fulfilled, (state) => {
                state.update.loading = false;
                state.update.loaded = true;
                state.update.success = true;
            })
            .addCase(updateChangelog.rejected, state => {
                state.update.loading = false;
                state.update.loaded = true;
            })

            .addCase(deleteChangelog.pending, state => {
                return {...state, delete: {...initialState.delete, loading: true}};
            })
            .addCase(deleteChangelog.fulfilled, (state) => {
                state.delete.loading = false;
                state.delete.loaded = true;
                state.delete.success = true;
            })
            .addCase(deleteChangelog.rejected, state => {
                state.delete.loading = false;
                state.delete.loaded = true;
            })

    }
});

export const {
    resetChangelog,
    resetChangelogCreate,
    resetChangelogDelete,
    resetChangelogUpdate
} = ChangelogSlice.actions;

export default ChangelogSlice.reducer;
