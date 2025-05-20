import { createSlice } from '@reduxjs/toolkit';

// Try to get wishlist from localStorage
const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      return JSON.parse(savedWishlist);
    }
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
  }
  return { items: [] };
};

const initialState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { _id } = action.payload;
      const existingItem = state.items.find(item => item._id === _id);
      
      if (!existingItem) {
        state.items.push(action.payload);
      }
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    clearWishlist: (state) => {
      state.items = [];
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
