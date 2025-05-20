import { mockProducts, mockOrders, mockUsers, mockDiscounts, mockPromotions } from './mockData';

// Mock API implementation that returns the mock data
export const mockAPI = {
  // Auth
  login: async (credentials) => {
    // Simple mock authentication
    if (credentials.email === 'admin@teestyle.com' && credentials.password === 'admin123') {
      const token = 'mock-jwt-token';
      localStorage.setItem('adminToken', token);
      return { 
        data: { 
          token,
          user: {
            _id: 'admin1',
            name: 'Admin User',
            email: 'admin@teestyle.com',
            role: 'admin'
          }
        } 
      };
    } else {
      throw { 
        response: { 
          data: { message: 'Invalid email or password' } 
        } 
      };
    }
  },
  
  // Dashboard
  getDashboardStats: async () => {
    return {
      data: {
        totalSales: 12500.75,
        totalOrders: mockOrders.length,
        totalProducts: mockProducts.length,
        totalUsers: mockUsers.length,
        recentOrders: mockOrders.slice(0, 5),
        topProducts: mockProducts.slice(0, 5).map(product => ({
          ...product,
          sales: Math.floor(Math.random() * 100) + 10
        }))
      }
    };
  },
  
  // Products
  getProducts: async () => {
    return { data: mockProducts };
  },
  
  getProduct: async (id) => {
    const product = mockProducts.find(p => p._id === id);
    if (!product) {
      throw { response: { data: { message: 'Product not found' } } };
    }
    return { data: product };
  },
  
  createProduct: async (productData) => {
    const newProduct = {
      _id: `p${mockProducts.length + 1}`,
      ...productData,
      createdAt: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return { data: newProduct };
  },
  
  updateProduct: async (id, productData) => {
    const index = mockProducts.findIndex(p => p._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Product not found' } } };
    }
    
    const updatedProduct = {
      ...mockProducts[index],
      ...productData,
      _id: id
    };
    
    mockProducts[index] = updatedProduct;
    return { data: updatedProduct };
  },
  
  deleteProduct: async (id) => {
    const index = mockProducts.findIndex(p => p._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Product not found' } } };
    }
    
    mockProducts.splice(index, 1);
    return { data: { message: 'Product deleted successfully' } };
  },
  
  // Orders
  getOrders: async () => {
    return { data: mockOrders };
  },
  
  getOrder: async (id) => {
    const order = mockOrders.find(o => o._id === id);
    if (!order) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    return { data: order };
  },
  
  updateOrderStatus: async (id, status) => {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    
    mockOrders[index].orderStatus = status;
    mockOrders[index].updatedAt = new Date().toISOString();
    
    return { data: mockOrders[index] };
  },
  
  cancelOrder: async (id, reason) => {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    
    // Only allow cancellation if order is not delivered or already cancelled
    const currentStatus = mockOrders[index].orderStatus || mockOrders[index].status;
    if (currentStatus?.toLowerCase() === 'delivered' || currentStatus?.toLowerCase() === 'cancelled') {
      throw { 
        response: { 
          data: { 
            message: `Cannot cancel order in ${currentStatus} status` 
          } 
        } 
      };
    }
    
    mockOrders[index].orderStatus = 'Cancelled';
    mockOrders[index].cancellationReason = reason || 'Cancelled by admin';
    mockOrders[index].updatedAt = new Date().toISOString();
    
    return { data: mockOrders[index] };
  },
  
  processRefund: async (id, refundData) => {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    
    // Only allow refunds for delivered, shipped or cancelled orders
    const validRefundStatuses = ['delivered', 'shipped', 'cancelled'];
    const currentStatus = (mockOrders[index].orderStatus || mockOrders[index].status || '').toLowerCase();
    
    if (!validRefundStatuses.includes(currentStatus)) {
      throw { 
        response: { 
          data: { 
            message: `Cannot process refund for order in ${currentStatus} status` 
          } 
        } 
      };
    }
    
    // Create refund record
    const refund = {
      refundId: `r-${Date.now().toString().slice(-6)}`,
      amount: refundData.amount || mockOrders[index].totalAmount,
      reason: refundData.reason || 'Refund processed by admin',
      status: 'Completed',
      processedAt: new Date().toISOString()
    };
    
    // Add refund to order
    if (!mockOrders[index].refunds) {
      mockOrders[index].refunds = [];
    }
    
    mockOrders[index].refunds.push(refund);
    mockOrders[index].refundStatus = 'Refunded';
    mockOrders[index].updatedAt = new Date().toISOString();
    
    return { data: mockOrders[index] };
  },
  
  addOrderNote: async (id, note) => {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    
    // Create note record
    const noteRecord = {
      id: `note-${Date.now().toString().slice(-6)}`,
      content: note,
      createdAt: new Date().toISOString(),
      createdBy: 'Admin'
    };
    
    // Add note to order
    if (!mockOrders[index].notes) {
      mockOrders[index].notes = [];
    }
    
    mockOrders[index].notes.push(noteRecord);
    mockOrders[index].updatedAt = new Date().toISOString();
    
    return { data: mockOrders[index] };
  },
  
  updateShipment: async (id, shipmentData) => {
    const index = mockOrders.findIndex(o => o._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'Order not found' } } };
    }
    
    // Create or update shipment information
    const shipment = {
      trackingNumber: shipmentData.trackingNumber,
      carrier: shipmentData.carrier,
      shippedAt: new Date().toISOString(),
      estimatedDelivery: shipmentData.estimatedDelivery,
      trackingUrl: shipmentData.trackingUrl
    };
    
    mockOrders[index].shipment = shipment;
    mockOrders[index].orderStatus = 'Shipped';
    mockOrders[index].updatedAt = new Date().toISOString();
    
    return { data: mockOrders[index] };
  },
  
  // Users
  getUsers: async () => {
    return { data: mockUsers };
  },
  
  getUser: async (id) => {
    const user = mockUsers.find(u => u._id === id);
    if (!user) {
      throw { response: { data: { message: 'User not found' } } };
    }
    return { data: user };
  },
  
  updateUser: async (id, userData) => {
    const index = mockUsers.findIndex(u => u._id === id);
    if (index === -1) {
      throw { response: { data: { message: 'User not found' } } };
    }
    
    const updatedUser = {
      ...mockUsers[index],
      ...userData,
      _id: id
    };
    
    mockUsers[index] = updatedUser;
    return { data: updatedUser };
  },
  
  // Categories
  getCategories: async () => {
    return { 
      data: ['Marvel', 'DC', 'Anime', 'Custom'].map((name, index) => ({
        _id: `c${index + 1}`,
        name,
        count: mockProducts.filter(p => p.category === name).length
      }))
    };
  },
  
  // Discounts
  getDiscounts: async () => {
    return { data: mockDiscounts };
  },
  
  // Promotions
  getPromotions: async () => {
    return { data: mockPromotions };
  }
};

export default mockAPI;
