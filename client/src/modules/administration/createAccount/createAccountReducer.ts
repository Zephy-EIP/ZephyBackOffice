import client from "@/utils/client";
import { BasicCall } from "@/utils/reducerUtils";
import { SimpleReducerPayload } from "@/utils/types";
import { getBasicErrorPayloadAxios } from '@/utils/utils';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CreateAccountState extends BasicCall {
    error?: number,
}

const initialState: CreateAccountState = {
    loading: false,
    success: false,
    loaded: false,
}

export const createAccount = createAsyncThunk(
    'create-account/create-account',
    async (params: {
        email: string,
        password: string,
        username: string,
        roleId: number | null,
    }) => {
        const result: SimpleReducerPayload = await client.post('/user/register', {
            email: params.email,
            password: params.password,
            username: params.username,
            role_id: params.roleId,
        }).then(_res => {
            return { success: true, error: 0 };
        }).catch(err => {
            return getBasicErrorPayloadAxios(err);
        });
        return result;
    }
)

const CreateAccountSlice = createSlice({
    name: 'create-account',
    initialState,
    reducers: {
        resetCreateAccount() {
            return initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createAccount.pending, () => {
                return {...initialState, loading: true};
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
                state.success = action.payload.success;
                state.error = action.payload.error;
            })
            .addCase(createAccount.rejected, () => {
                return {...initialState, success: false};
            })
    }
});

export const { resetCreateAccount } = CreateAccountSlice.actions;

export default CreateAccountSlice.reducer;
