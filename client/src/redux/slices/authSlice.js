import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Try to get user from localStorage
const loadUserFromStorage = () => {
  try {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
  }
  return null;
};

const initialState = {
  user: loadUserFromStorage(),
  loading: false,
  error: null,
};

// Mock users for development (remove in production)
const mockUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  },
];

// Register user (mock implementation for development)
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email is already taken
      const existingUser = mockUsers.find(user => user.email === userData.email);
      if (existingUser) {
        return rejectWithValue('Email is already registered');
      }
      
      // Create new user
      const newUser = {
        _id: String(mockUsers.length + 1),
        ...userData,
        role: 'user', // Default role
      };
      
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;
      
      // Save to localStorage to persist login
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Login user (mock implementation for development)
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user by email
      const user = mockUsers.find(user => user.email === userData.email);
      
      // Check if user exists and password matches
      if (!user || user.password !== userData.password) {
        return rejectWithValue('Invalid email or password');
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      // Save to localStorage to persist login
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  return null;
});

// Update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get current user from state
      const { user } = getState().auth;
      
      if (!user) {
        return rejectWithValue('User not authenticated');
      }
      
      // Update user data (in a real app, this would be an API call)
      const updatedUser = {
        ...user,
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage to persist changes
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

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
      // Handle register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Handle profile update
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
