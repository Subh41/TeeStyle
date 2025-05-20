import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample product data for t-shirt e-commerce
const sampleProducts = [
  {
    _id: '1',
    name: 'Classic Black T-Shirt - Men',
    description: 'Premium cotton classic fit t-shirt with crew neck. Perfect for everyday wear.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDM5MzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Men',
    stock: 50,
    rating: 4.8,
    numReviews: 32,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
  },
  {
    _id: '2',
    name: 'Graphic Print T-Shirt - Men',
    description: 'Stylish graphic print t-shirt with modern design. Made from soft, breathable fabric.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDM5ODI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Men',
    stock: 35,
    rating: 4.5,
    numReviews: 28,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Grey'],
  },
  {
    _id: '3',
    name: 'Striped V-Neck T-Shirt - Women',
    description: 'Elegant striped v-neck t-shirt for women. Perfect for casual and semi-formal occasions.',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDAzMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Women',
    stock: 40,
    rating: 4.7,
    numReviews: 42,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue/White', 'Black/White'],
  },
  {
    _id: '4',
    name: 'Organic Cotton T-Shirt - Women',
    description: 'Eco-friendly organic cotton t-shirt. Comfortable fit with stylish design.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDA3MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Women',
    stock: 30,
    rating: 4.9,
    numReviews: 36,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Green', 'White'],
  },
  {
    _id: '5',
    name: 'Vintage Washed T-Shirt - Men',
    description: 'Retro style vintage washed t-shirt with distressed print. Relaxed fit for maximum comfort.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDQxMTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Men',
    stock: 25,
    rating: 4.6,
    numReviews: 20,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Grey'],
  },
  {
    _id: '6',
    name: 'Slim Fit Cropped T-Shirt - Women',
    description: 'Modern slim fit cropped t-shirt. Perfect for pairing with high-waisted jeans or skirts.',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDE2OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Women',
    stock: 45,
    rating: 4.7,
    numReviews: 38,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'White', 'Red'],
  },
  {
    _id: '7',
    name: 'Pocket T-Shirt - Men',
    description: 'Classic pocket t-shirt with a comfortable relaxed fit. Made from high-quality cotton.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVuJTIwdC1zaGlydHx8fHx8fDE2ODMyMDQyMTQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Men',
    stock: 55,
    rating: 4.3,
    numReviews: 24,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Grey', 'Black'],
  },
  {
    _id: '8',
    name: 'Long Sleeve T-Shirt - Women',
    description: 'Comfortable long sleeve t-shirt perfect for cooler weather. Soft fabric with great stretch.',
    price: 31.99,
    image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDI1NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
    category: 'Women',
    stock: 30,
    rating: 4.8,
    numReviews: 42,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Burgundy'],
  },
];

const initialState = {
  featuredProducts: [],
  products: [],
  loading: false,
  error: null,
};

// Thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch('/api/products');
      // const data = await response.json();
      // return data;
      
      // For now, return sample data
      return sampleProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching featured products
export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch('/api/products/featured');
      // const data = await response.json();
      // return data;
      
      // For now, return sample featured data (first 4 products)
      return sampleProducts.slice(0, 4);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the products slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
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
      })
      // Handle fetchFeaturedProducts
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { setFeaturedProducts, setProducts } = productSlice.actions;
export default productSlice.reducer;
