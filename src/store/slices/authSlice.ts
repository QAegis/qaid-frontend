import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService, {
    LoginCredentials,
    RegisterData,
    User
} from '@/services/authService';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Custom type for API errors
interface APIError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

// Login action
export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('token', response.access_token);
            return response.user;
        } catch (error) {
            const typedError = error as APIError;
            return rejectWithValue(typedError.response?.data?.message || 'Login failed');
        }
    }
);

// Register action
export const register = createAsyncThunk<void, RegisterData, { rejectValue: string }>(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            await authService.register(data);
        } catch (error) {
            const typedError = error as APIError;
            return rejectWithValue(typedError.response?.data?.message || 'Registration failed');
        }
    }
);

// Get profile action
export const getProfile = createAsyncThunk<User, void, { rejectValue: string }>(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            return await authService.getProfile();
        } catch (error) {
            const typedError = error as APIError;
            return rejectWithValue(typedError.response?.data?.message || 'Failed to get profile');
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.user = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
