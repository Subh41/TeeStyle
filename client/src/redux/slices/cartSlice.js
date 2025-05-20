import { createSlice } from '@reduxjs/toolkit';

// Try to get cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return { items: [], total: 0 };
};

const initialState = loadCartFromStorage();

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Generate a unique cart item ID that includes product variations
const generateCartItemId = (product) => {
  const { _id, selectedSize, selectedColor } = product;
  return `${_id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      // Create unique ID for this product variant
      const cartItemId = generateCartItemId(product);
      
      // Find existing item with same ID, size and color
      const existingItemIndex = state.items.findIndex(item => {
        const itemId = generateCartItemId(item);
        return itemId === cartItemId;
      });
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const existingQuantity = state.items[existingItemIndex].quantity || 1;
        const newQuantity = product.quantity || 1;
        state.items[existingItemIndex].quantity = existingQuantity + newQuantity;
      } else {
        // Otherwise add new item
        state.items.push({
          ...product,
          cartItemId, // Store the unique identifier
          quantity: product.quantity || 1
        });
      }
      
      state.total = calculateTotal(state.items);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      // Remove item by cartItemId
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
      state.total = calculateTotal(state.items);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find(item => item.cartItemId === cartItemId);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      
      state.total = calculateTotal(state.items);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
