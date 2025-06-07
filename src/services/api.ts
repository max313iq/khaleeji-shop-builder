
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Set token to localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Remove token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Generic API request function
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API calls
export const authAPI = {
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => apiRequest('/users/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiRequest('/users/me'),
};

// Stores API calls
export const storesAPI = {
  create: (storeData: {
    name: string;
    description: string;
    category: string;
    logo?: string;
  }) => apiRequest('/stores', {
    method: 'POST',
    body: JSON.stringify(storeData),
  }),

  getAll: (filters?: string) => apiRequest(`/stores${filters ? `?${filters}` : ''}`),

  getMyStore: () => apiRequest('/stores/my-store'),

  getMyStoreOrders: () => apiRequest('/stores/my-store/orders'),

  updateOrderStatus: (orderId: string, status: string) =>
    apiRequest(`/stores/my-store/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  getById: (id: string) => apiRequest(`/stores/${id}`),
};

// Products API calls
export const productsAPI = {
  create: (productData: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
  }) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),

  getAll: (filters?: string) => apiRequest(`/products${filters ? `?${filters}` : ''}`),

  getById: (id: string) => apiRequest(`/products/${id}`),

  addRating: (productId: string, rating: number) =>
    apiRequest(`/products/${productId}/ratings`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    }),

  addComment: (productId: string, text: string) =>
    apiRequest(`/products/${productId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
};

// Orders API calls
export const ordersAPI = {
  create: (orderData: {
    orderItems: Array<{ product: string; quantity: number }>;
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    paymentMethod: string;
  }) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  getMyOrders: () => apiRequest('/orders/my-orders'),
};

// Upload API call
export const uploadAPI = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('فشل في رفع الصورة');
    }

    return response.json();
  },
};
