import {
    type AuthResponse, login, register, type TLogin, type TRegister, getProfile as getProfileApi,
    type ProfileResponse
} from "./api.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";


export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: TRegister)=> {
        return await register(data);
    }
)

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (data: TLogin) => {
        return await login((data))
    }
)

export const getProfile = createAsyncThunk(
    'users/profile',
    async (data: string) => {
        return await getProfileApi(data)
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
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;

            localStorage.removeItem(('accessToken'));
            localStorage.removeItem(('refreshToken'))
        }
    },
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
                state.error = action.error?.message ?? 'Ошибка регистрации!';
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
                state.error = action.error?.message ?? 'Ошибка регистрации!';
            })
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || 'Ошибка входа';
            })
    }
})


export const selectUser = (state: RootState) => state.auth.user;
export const { logOut } = authSlice.actions
export default authSlice.reducer;
