import {
    type AuthResponse, login, register, type TLogin, type TRegister, getProfile as getProfileApi,
    type ProfileResponse
} from "./api.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";


export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: TRegister) => {
        try {
            return await register((data))
        } catch (err) {
            return Promise.reject(err);
        }
    }
)

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (data: TLogin) => {
        try {
            return await login((data))
        } catch (err) {
            return Promise.reject(err);
        }
    }
)

export const getProfile = createAsyncThunk(
    'users/profile',
    async (data: string) => {
        try {
            return await getProfileApi(data)
        } catch (err) {
            return Promise.reject(err);
        }
    }
)

type AuthState = {
    user: AuthResponse['user'] | null,
    accessToken: string | null,
    refreshToken: string | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getProfile.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileResponse>) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})


export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;