import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { mockSettings } from '../../services/mockData';

// Helper function to set auth header (kept for future API implementation)
const setAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Async thunks
export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll use mock data instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/settings`, setAuthHeader());
      return mockSettings;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll update mock settings instead of making an API call
      const updatedSettings = {
        ...mockSettings,
        ...settingsData,
        updatedAt: new Date().toISOString()
      };
      
      return updatedSettings;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  settings: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSettingsError: (state) => {
      state.error = null;
    },
    resetSettingsSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Update settings
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.success = true;
        toast.success('Settings updated successfully!');
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearSettingsError, resetSettingsSuccess } = settingsSlice.actions;
export default settingsSlice.reducer;
