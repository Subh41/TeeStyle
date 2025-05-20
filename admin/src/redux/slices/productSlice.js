import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { mockProducts } from '../../services/mockData';

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
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll use mock data instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/products`, setAuthHeader());
      return mockProducts;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll create a mock product instead of making an API call
      const newProduct = {
        _id: 'p' + (mockProducts.length + 1),
        ...productData,
        createdAt: new Date().toISOString()
      };
      
      return newProduct;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll update a mock product instead of making an API call
      const productIndex = mockProducts.findIndex(product => product._id === id);
      
      if (productIndex === -1) {
        return rejectWithValue('Product not found');
      }
      
      const updatedProduct = {
        ...mockProducts[productIndex],
        ...productData,
        _id: id
      };
      
      return updatedProduct;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll delete a mock product instead of making an API call
      const productIndex = mockProducts.findIndex(product => product._id === id);
      
      if (productIndex === -1) {
        return rejectWithValue('Product not found');
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
  products: [],
  loading: false,
  error: null,
  success: false,
};

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    resetProductSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = true;
        toast.success('Product created successfully!');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map(product => 
          product._id === action.payload._id ? action.payload : product
        );
        state.success = true;
        toast.success('Product updated successfully!');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product._id !== action.payload);
        state.success = true;
        toast.success('Product deleted successfully!');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearProductError, resetProductSuccess } = productSlice.actions;
export default productSlice.reducer;
