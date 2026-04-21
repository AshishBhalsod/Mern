import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
  return res.data;
});

export const loginUser = createAsyncThunk('auth/login', async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data, { withCredentials: true });
  return res.data;
});

export const registerUser = createAsyncThunk('auth/register', async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data, { withCredentials: true });
  return res.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => { state.user = action.payload.user; })
      .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload.user; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  }
});

export default authSlice.reducer;