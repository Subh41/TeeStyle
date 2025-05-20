import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample discount coupon data for the superhero-themed store
const sampleDiscounts = [
  {
    _id: '1',
    code: 'HERO25',
    description: 'Get 25% off on all Marvel items',
    discountPercentage: 25,
    minPurchase: 50,
    maxDiscount: 100,
    applicableProducts: ['Marvel'],
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    isActive: true,
    usageLimit: 1000,
    usageCount: 125
  },
  {
    _id: '2',
    code: 'DCFAN20',
    description: '20% off on all DC Comics items',
    discountPercentage: 20,
    minPurchase: 40,
    maxDiscount: 75,
    applicableProducts: ['DC Comics'],
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    isActive: true,
    usageLimit: 1000,
    usageCount: 87
  },
  {
    _id: '3',
    code: 'ANIME15',
    description: '15% off on all Anime collection items',
    discountPercentage: 15,
    minPurchase: 35,
    maxDiscount: 50,
    applicableProducts: ['Anime'],
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    isActive: true,
    usageLimit: 1000,
    usageCount: 63
  },
  {
    _id: '4',
    code: 'WELCOME10',
    description: '10% off on your first purchase',
    discountPercentage: 10,
    minPurchase: 0,
    maxDiscount: 30,
    applicableProducts: ['All'],
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    isActive: true,
    usageLimit: 1000,
    usageCount: 215
  },
  {
    _id: '5',
    code: 'SUPERPACK',
    description: 'Get $15 off when you buy 3 or more items',
    discountAmount: 15,
    minQuantity: 3,
    maxDiscount: 15,
    applicableProducts: ['All'],
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    isActive: true,
    usageLimit: 500,
    usageCount: 42
  }
];

const initialState = {
  discounts: [],
  loading: false,
  error: null,
  appliedDiscount: null,
  discountMessage: '',
};

// Thunk for fetching all discounts
export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch('/api/discounts');
      // const data = await response.json();
      // return data;
      
      // For now, return sample data
      return sampleDiscounts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for adding a new discount
export const addDiscount = createAsyncThunk(
  'discounts/addDiscount',
  async (discountData, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch('/api/discounts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(discountData),
      // });
      // const data = await response.json();
      // return data;
      
      // For now, simulate adding a discount
      return {
        ...discountData,
        _id: Date.now().toString(),
        usageCount: 0
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating a discount
export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async (discountData, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch(`/api/discounts/${discountData._id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(discountData),
      // });
      // const data = await response.json();
      // return data;
      
      // For now, simulate updating a discount
      return discountData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a discount
export const deleteDiscount = createAsyncThunk(
  'discounts/deleteDiscount',
  async (discountId, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch(`/api/discounts/${discountId}`, {
      //   method: 'DELETE',
      // });
      // const data = await response.json();
      // return data;
      
      // For now, simulate deleting a discount
      return discountId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for applying a discount coupon
export const applyDiscount = createAsyncThunk(
  'discounts/applyDiscount',
  async ({ code, cartTotal, cartItems }, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch('/api/discounts/apply', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ code, cartTotal, cartItems }),
      // });
      // const data = await response.json();
      // return data;
      
      // For now, simulate applying a discount
      const discount = sampleDiscounts.find(d => d.code === code && d.isActive);
      
      if (!discount) {
        return rejectWithValue('Invalid or expired discount code');
      }
      
      // Check minimum purchase requirement
      if (cartTotal < discount.minPurchase) {
        return rejectWithValue(`Minimum purchase of $${discount.minPurchase} required`);
      }
      
      // Check if product restrictions apply
      if (discount.applicableProducts[0] !== 'All') {
        const hasApplicableProduct = cartItems.some(item => 
          discount.applicableProducts.includes(item.category)
        );
        
        if (!hasApplicableProduct) {
          return rejectWithValue(`This coupon only applies to ${discount.applicableProducts.join(', ')} products`);
        }
      }
      
      // Calculate discount amount
      let discountAmount = 0;
      
      if (discount.discountPercentage) {
        discountAmount = (cartTotal * discount.discountPercentage) / 100;
      } else if (discount.discountAmount) {
        discountAmount = discount.discountAmount;
      }
      
      // Apply maximum discount cap if exists
      if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
        discountAmount = discount.maxDiscount;
      }
      
      return {
        discount,
        discountAmount,
        message: `Discount applied: ${discount.description}`
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the discounts slice
const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    clearDiscount: (state) => {
      state.appliedDiscount = null;
      state.discountMessage = '';
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
      })
      
      // Add discount
      .addCase(addDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts.push(action.payload);
      })
      .addCase(addDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update discount
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.discounts.findIndex(discount => discount._id === action.payload._id);
        if (index !== -1) {
          state.discounts[index] = action.payload;
        }
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete discount
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = state.discounts.filter(discount => discount._id !== action.payload);
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Apply discount
      .addCase(applyDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.discountMessage = '';
      })
      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedDiscount = action.payload.discount;
        state.discountAmount = action.payload.discountAmount;
        state.discountMessage = 'Discount applied successfully!';
      })
      .addCase(applyDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.discountMessage = action.payload;
      });
  },
});

// Export the actions and reducer
export const { clearDiscount } = discountSlice.actions;
export default discountSlice.reducer;
