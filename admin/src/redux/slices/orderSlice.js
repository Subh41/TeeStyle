import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { mockOrders } from '../../services/mockData';

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
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll use mock data instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/orders`, setAuthHeader());
      return mockOrders;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'orders/fetchOrderDetails',
  async (id, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll fetch a mock order instead of making an API call
      // In a real application, this would be: const response = await axios.get(`${API_URL}/orders/${id}`, setAuthHeader());
      
      // Find the order by ID
      const order = mockOrders.find(order => order._id === id);
      
      if (!order) {
        return rejectWithValue('Order not found');
      }
      
      return order;
    } catch (error) {
      const message = 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // For demo purposes, we'll update a mock order instead of making an API call
      // In a real application, this would be: const response = await axios.put(`${API_URL}/orders/${id}/status`, { status }, setAuthHeader());
      
      // Find the order to update
      const orderIndex = mockOrders.findIndex(order => order._id === id);
      
      if (orderIndex === -1) {
        return rejectWithValue('Order not found');
      }
      
      // Create updated order
      const updatedOrder = {
        ...mockOrders[orderIndex],
        orderStatus: status,
        updatedAt: new Date().toISOString()
      };
      
      return updatedOrder;
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
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetOrderSuccess: (state) => {
      state.success = false;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Fetch order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map(order => 
          order._id === action.payload._id ? action.payload : order
        );
        if (state.orderDetails && state.orderDetails._id === action.payload._id) {
          state.orderDetails = action.payload;
        }
        state.success = true;
        toast.success('Order status updated successfully!');
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearOrderError, resetOrderSuccess, clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
