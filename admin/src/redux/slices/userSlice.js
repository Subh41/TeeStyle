import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { mockUsers } from '../../services/mockData';

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
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll use mock data instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/users`, setAuthHeader());
      return mockUsers;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (id, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll fetch a mock user instead of making an API call
      const user = mockUsers.find(user => user._id === id);
      
      if (!user) {
        return rejectWithValue('User not found');
      }
      
      return user;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll update a mock user instead of making an API call
      const userIndex = mockUsers.findIndex(user => user._id === id);
      
      if (userIndex === -1) {
        return rejectWithValue('User not found');
      }
      
      const updatedUser = {
        ...mockUsers[userIndex],
        status: status,
        _id: id
      };
      
      return updatedUser;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll delete a mock user instead of making an API call
      const userIndex = mockUsers.findIndex(user => user._id === id);
      
      if (userIndex === -1) {
        return rejectWithValue('User not found');
      }
      
      return id;
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
  users: [],
  userDetails: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    resetUserSuccess: (state) => {
      state.success = false;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Fetch user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Update user status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user._id === action.payload._id ? action.payload : user
        );
        if (state.userDetails && state.userDetails._id === action.payload._id) {
          state.userDetails = action.payload;
        }
        state.success = true;
        toast.success('User status updated successfully!');
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        state.success = true;
        toast.success('User deleted successfully!');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearUserError, resetUserSuccess, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
