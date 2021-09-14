import { BasicCall, BasicResponse } from "@/utils/reducerUtils";
import client from "@/utils/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        const res: {
            success: boolean,
            error: number,
        } = await client.put<BasicResponse>('/user/password', {
            old_password: params.oldPassword,
            new_password: params.newPassword,
        }).then(_res => {
            return { success: true, error: 0 };
        }).catch(err => {
            if (axios.isAxiosError(err)) {
                if (typeof err.response?.status === 'number')
                    return { success: false, error: err.response.status };
            }
            return { success: false, error: 500 };
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
