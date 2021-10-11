import Member from '@/entities/Member';
import client from '@/utils/client';
import { BasicCall, BasicResponse } from '@/utils/reducerUtils';
import { getBasicDataPayload, getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface MemberState{
    create: BasicCall,
    delete: BasicCall,
    list: BasicCall & {
        list?: Member[],
    }
}

const initialState: MemberState = {
    create: {
        loading: false,
        success: false,
        loaded: false,
    },
    list: {
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

export const getMemberList = createAsyncThunk(
    'member/list',
    async () => {
        return await client.get<{memberList: Member[]}>('/member/list')
            .then(res => getBasicDataPayload(res.data.memberList))
            .catch(err => getBasicErrorPayloadAxios<Member[]>(err))
    });

export const createMember = createAsyncThunk(
    'member/new',
    async (args: {memberName: string}) => {
        return await client.post<BasicResponse>('/member', {name: args.memberName})
            .then(res => getBasicDataPayload(res.data))
            .catch(err => getBasicErrorPayloadAxios<BasicResponse>(err));
    });

export const deleteMember = createAsyncThunk(
    'member/delete',
    async (args: {memberName: string}) => {
        return await client.delete<BasicResponse>('/member', {data: {name: args.memberName}})
            .then(res => getBasicDataPayload(res.data))
            .catch(err => getBasicErrorPayloadAxios<BasicResponse>(err));
    });

const MemberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        resetMember() {
            return initialState;
        },
        resetCreateMember(state) {
            return {...state, create: initialState.create};
        },
        resetDeleteMember(state) {
            return {...state, delete: initialState.delete};
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMemberList.pending, (state) => {
                return {...state, list: {...initialState.list, loading: true}};
            })
            .addCase(getMemberList.fulfilled, (state, action) => {
                state.list.loading = false;
                state.list.loaded = true;
                state.list.success = action.payload.success;
                state.list.list = action.payload.data;
            })
            .addCase(getMemberList.rejected, (state) => {
                state.list.loading = false;
                state.list.loaded = true;
            })
            .addCase(createMember.pending, (state) => {
                return {...state, create: {...initialState.create, loading: true}};
            })
            .addCase(createMember.fulfilled, (state, action) => {
                state.create.loading = false;
                state.create.loaded = true;
                state.create.success = action.payload.success;
            })
            .addCase(createMember.rejected, (state) => {
                state.create.loading = false;
                state.create.loaded = true;
            })
            .addCase(deleteMember.pending, (state) => {
                return {...state, delete: {...initialState.delete, loading: true}};
            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                state.delete.loading = false;
                state.delete.loaded = true;
                state.delete.success = action.payload.success;
            })
            .addCase(deleteMember.rejected, (state) => {
                state.delete.loading = false;
                state.delete.loaded = true;
            })
    }
});

export const { resetMember, resetCreateMember, resetDeleteMember } = MemberSlice.actions;

export default MemberSlice.reducer;
