import User from "@/entities/User";
import { BasicCall } from "@/utils/reducerUtils";
import client from "@/utils/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState extends BasicCall {
    user: User | null
}

const initialState: UserState = {
    loading: false,
    success: false,
    loaded: false,
    user: null,
}

interface UserResponse {
    user: User
}

export const getUser = createAsyncThunk(
    'user/get',
    async () => {
        const res = await client.get<UserResponse>('/user').catch(_err => { return null; });
        if (res === null)
            return null;
        return res.data.user;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser() {
            return initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, () => {
                return { ...initialState, loading: true };
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
                state.success = action !== null;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, () => {
                return {...initialState, loaded: true};
            });
        ;
    }
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
