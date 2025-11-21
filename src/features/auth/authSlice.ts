import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postJson, LoginResponse, SignupPayload, SignupResponse } from '@/lib/api';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  hospitalId: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  initialized: false,
};

const USER_KEY = 'hms_user';

function persistState(state: Pick<AuthState, 'user'>) {
  try {
    if (state.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { email: string; password: string }
>('auth/login', async ({ email, password }) => {
  const data = await postJson<LoginResponse>('/auth/login', { email, password });
  return data;
});

export const refreshThunk = createAsyncThunk<{ success: boolean }, void>(
  'auth/refresh',
  async () => {
    const data = await postJson<{ success: boolean }>('/auth/refresh', {});
    return data;
  }
);

export const logoutThunk = createAsyncThunk<
  { success: boolean },
  void
>('auth/logout', async () => {
  await postJson<{ success: boolean }>('/auth/logout', {}).catch(() => ({ success: true }));
  return { success: true };
});

export const signupThunk = createAsyncThunk<
  SignupResponse,
  { name: string; email: string; password: string; role: string; hospitalId?: string | null }
>('auth/signup', async ({ name, email, password, role, hospitalId }) => {
  // Map unknown roles to 'user' to satisfy backend enum
  const mappedRole: 'super_admin' | 'admin' | 'user' =
    role === 'super_admin' || role === 'admin' ? (role as any) : 'user';
  // Prefer a conventional public endpoint; if backend lacks it, this will 404 and surface error
  const data = await postJson<SignupResponse>('/auth/register', {
    name,
    email,
    password,
    role: mappedRole,
    // hospitalId: hospitalId ?? null,
  });
  return data;
});

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  // no-op; we just signal initialization
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFromStorage(state) {
      try {
        const u = localStorage.getItem(USER_KEY);
        state.user = u ? (JSON.parse(u) as AuthUser) : null;
      } catch {
        state.user = null;
      }
      state.initialized = true;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
      persistState({ user: null });
    },
    updateUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      persistState({ user: state.user });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = null;
        state.refreshToken = null;
        persistState({ user: state.user });
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(refreshThunk.fulfilled, (state) => {
        // Cookies rotated server-side; nothing to store on client
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Token refresh failed';
        // Optionally clear user if refresh fails
        state.accessToken = null;
        state.refreshToken = null;
        // Do not clear user here to avoid UX jank; rely on /auth/me on next load
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'idle';
        state.error = null;
        persistState({ user: null });
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.initialized = true;
      });
  },
});

export const { setFromStorage, clearAuth, updateUser } = authSlice.actions;

export const selectIsAuthenticated = (s: { auth: AuthState }) => Boolean(s.auth.user);
export const selectAuthStatus = (s: { auth: AuthState }) => s.auth.status;
export const selectAuthError = (s: { auth: AuthState }) => s.auth.error;
export const selectAuthUser = (s: { auth: AuthState }) => s.auth.user;

export default authSlice.reducer;


