import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { mockPromotions } from '../../services/mockData';

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
export const fetchPromotions = createAsyncThunk(
  'promotions/fetchPromotions',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll use mock data instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/promotions`, setAuthHeader());
      return mockPromotions;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const createPromotion = createAsyncThunk(
  'promotions/createPromotion',
  async (promotionData, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll create a mock promotion instead of making an API call
      // In a real application, this would be: const response = await axios.post(`${API_URL}/promotions`, promotionData, setAuthHeader());
      
      // Create a new mock promotion with a unique ID
      const newPromotion = {
        _id: 'pr' + (mockPromotions.length + 1),
        ...promotionData,
        createdAt: new Date().toISOString()
      };
      
      // In a real app, this would be returned from the API
      return newPromotion;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const updatePromotion = createAsyncThunk(
  'promotions/updatePromotion',
  async ({ id, promotionData }, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll update a mock promotion instead of making an API call
      // In a real application, this would be: const response = await axios.put(`${API_URL}/promotions/${id}`, promotionData, setAuthHeader());
      
      // Find the promotion to update
      const promotionIndex = mockPromotions.findIndex(promotion => promotion._id === id);
      
      if (promotionIndex === -1) {
        return rejectWithValue('Promotion not found');
      }
      
      // Create updated promotion
      const updatedPromotion = {
        ...mockPromotions[promotionIndex],
        ...promotionData,
        _id: id // Ensure ID doesn't change
      };
      
      // In a real app, this would be returned from the API
      return updatedPromotion;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const deletePromotion = createAsyncThunk(
  'promotions/deletePromotion',
  async (id, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll delete a mock promotion instead of making an API call
      // In a real application, this would be: await axios.delete(`${API_URL}/promotions/${id}`, setAuthHeader());
      
      // Find the promotion to delete
      const promotionIndex = mockPromotions.findIndex(promotion => promotion._id === id);
      
      if (promotionIndex === -1) {
        return rejectWithValue('Promotion not found');
      }
      
      // In a real app, we would just return the ID after successful deletion
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
  promotions: [],
  loading: false,
  error: null,
  success: false,
};

// Slice
const promotionSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    clearPromotionError: (state) => {
      state.error = null;
    },
    resetPromotionSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch promotions
      .addCase(fetchPromotions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = action.payload;
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Create promotion
      .addCase(createPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions.push(action.payload);
        state.success = true;
        toast.success('Promotion created successfully!');
      })
      .addCase(createPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Update promotion
      .addCase(updatePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = state.promotions.map(promotion => 
          promotion._id === action.payload._id ? action.payload : promotion
        );
        state.success = true;
        toast.success('Promotion updated successfully!');
      })
      .addCase(updatePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Delete promotion
      .addCase(deletePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = state.promotions.filter(promotion => promotion._id !== action.payload);
        state.success = true;
        toast.success('Promotion deleted successfully!');
      })
      .addCase(deletePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearPromotionError, resetPromotionSuccess } = promotionSlice.actions;
export default promotionSlice.reducer;
