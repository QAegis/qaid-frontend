"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, LoginCredentials, RegisterData } from '../services/authServices';

// Define extended auth service interface with the missing methods
interface AuthService {
  login: (credentials: LoginCredentials) => Promise<{ access_token: string; user: User }>;
  register: (data: RegisterData) => Promise<void>;
  getProfile: () => Promise<User>;
  logout: () => void;
  forgotPassword?: (email: string) => Promise<void>; // Optional since it may not exist yet
  resetPassword?: (token: string, password: string) => Promise<void>; // Optional since it may not exist yet
}

// Cast the authService to our extended interface
const typedAuthService = authService as AuthService;

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const user = await typedAuthService.getProfile();
                    setUser(user);
                } catch {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
    
        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        try {
            const { access_token, user } = await typedAuthService.login(credentials);
            localStorage.setItem('token', access_token);
            setUser(user);
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        setLoading(true);
        try {
            await typedAuthService.register(data);
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setLoading(true);
        try {
            // Check if the method exists in authService, otherwise implement it here
            if (typedAuthService.forgotPassword) {
                await typedAuthService.forgotPassword(email);
            } else {
                // Fallback implementation
                const response = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to send password reset email');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token: string, password: string) => {
        setLoading(true);
        try {
            // Check if the method exists in authService, otherwise implement it here
            if (typedAuthService.resetPassword) {
                await typedAuthService.resetPassword(token, password);
            } else {
                // Fallback implementation
                const response = await fetch('/api/auth/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, password }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to reset password');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        typedAuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};