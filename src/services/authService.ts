import axios from 'axios';

// Define the User interface
export interface User {
    id: string;
    name: string;
    email: string;
}

// Define login credentials interface
export interface LoginCredentials {
    email: string;
    password: string;
}

// Define registration data interface
export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"; // Use backend URL

// Create an Axios instance for API calls
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Needed if using cookies
});

// Function to safely retrieve the token (prevents server-side errors)
const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Request interceptor to attach the token to API calls
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Authentication service object
const authService = {
    // Login function
    async login(credentials: LoginCredentials): Promise<{ access_token: string; user: User }> {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },

    // Register function
    async register(data: RegisterData): Promise<void> {
        await apiClient.post('/auth/register', data);
    },

    // Fetch the authenticated user's profile
    async getProfile(): Promise<User> {
        const response = await apiClient.get('/auth/profile');
        return response.data;
    },

    // Logout function
    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    },
};

export default authService;