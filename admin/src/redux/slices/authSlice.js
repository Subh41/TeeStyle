import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Base URL for API (commented out since we're using mock data)
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll implement a mock authentication
      // In a real application, this would be: const response = await axios.post(`${API_URL}/auth/login`, userData);
      
      // Mock credentials check
      if (userData.email === 'admin@teestyle.com' && userData.password === 'admin123') {
        const mockResponse = {
          token: 'mock-jwt-token-for-admin-panel',
          user: {
            _id: 'admin1',
            name: 'Admin User',
            email: 'admin@teestyle.com',
            role: 'admin'
          }
        };
        
        localStorage.setItem('adminToken', mockResponse.token);
        return mockResponse;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('adminToken');
    return null;
  }
);

// Get user from localStorage
const userToken = localStorage.getItem('adminToken');

const initialState = {
  user: null,
  isAuthenticated: !!userToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        toast.success('Logged out successfully');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
