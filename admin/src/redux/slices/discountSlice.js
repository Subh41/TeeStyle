import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { mockDiscounts } from '../../services/mockData';

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
export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll use mock data instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/discounts`, setAuthHeader());
      return mockDiscounts;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const createDiscount = createAsyncThunk(
  'discounts/createDiscount',
  async (discountData, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll create a mock discount instead of making an API call
      // In a real application, this would be: const response = await axios.post(`${API_URL}/discounts`, discountData, setAuthHeader());
      
      // Create a new mock discount with a unique ID
      const newDiscount = {
        _id: 'd' + (mockDiscounts.length + 1),
        ...discountData,
        createdAt: new Date().toISOString()
      };
      
      // In a real app, this would be returned from the API
      return newDiscount;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async ({ id, discountData }, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll update a mock discount instead of making an API call
      // In a real application, this would be: const response = await axios.put(`${API_URL}/discounts/${id}`, discountData, setAuthHeader());
      
      // Find the discount to update
      const discountIndex = mockDiscounts.findIndex(discount => discount._id === id);
      
      if (discountIndex === -1) {
        return rejectWithValue('Discount not found');
      }
      
      // Create updated discount
      const updatedDiscount = {
        ...mockDiscounts[discountIndex],
        ...discountData,
        _id: id // Ensure ID doesn't change
      };
      
      // In a real app, this would be returned from the API
      return updatedDiscount;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  'discounts/deleteDiscount',
  async (id, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll delete a mock discount instead of making an API call
      // In a real application, this would be: await axios.delete(`${API_URL}/discounts/${id}`, setAuthHeader());
      
      // Find the discount to delete
      const discountIndex = mockDiscounts.findIndex(discount => discount._id === id);
      
      if (discountIndex === -1) {
        return rejectWithValue('Discount not found');
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
  discounts: [],
  loading: false,
  error: null,
  success: false,
};

// Slice
const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    clearDiscountError: (state) => {
      state.error = null;
    },
    resetDiscountSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch discounts
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Create discount
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts.push(action.payload);
        state.success = true;
        toast.success('Discount created successfully!');
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Update discount
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = state.discounts.map(discount => 
          discount._id === action.payload._id ? action.payload : discount
        );
        state.success = true;
        toast.success('Discount updated successfully!');
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Delete discount
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = state.discounts.filter(discount => discount._id !== action.payload);
        state.success = true;
        toast.success('Discount deleted successfully!');
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearDiscountError, resetDiscountSuccess } = discountSlice.actions;
export default discountSlice.reducer;
