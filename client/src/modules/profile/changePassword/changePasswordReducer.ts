import { BasicCall, BasicResponse } from "@/utils/reducerUtils";
import client from "@/utils/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SimpleReducerPayload } from "@/utils/types";
import { getBasicErrorPayloadAxios } from '@/utils/utils';

const initialState: BasicCall & { error: number } = {
    loading: false,
    success: false,
    loaded: false,
    error: 0,
}

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (params: {
        oldPassword: string,
        newPassword: string,
    }) => {
        const res: SimpleReducerPayload = await client.put<BasicResponse>('/user/password', {
            old_password: params.oldPassword,
            new_password: params.newPassword,
        }).then(_res => {
            return { success: true, error: 0 };
        }).catch(err => {
            return getBasicErrorPayloadAxios(err);
        });
        return res;
    }
);

const changePasswordSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetPasswordChangeReducer: () => {
            return initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(changePassword.pending, () => {
                return {...initialState, loading: true};
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
                state.success = action.payload.success;
                state.error = action.payload.error;
            })
            .addCase(changePassword.rejected, () => {
                return {...initialState, loaded: true, error: 500};
            });
        ;
    }
});

export const { resetPasswordChangeReducer } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
