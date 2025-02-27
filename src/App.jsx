'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Protected route wrapper component
function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isAuthRoute = pathname === '/login' || pathname === '/register';

    useEffect(() => {
        if (!loading && !isAuthenticated && !isAuthRoute) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router, isAuthRoute]);

    // Show loading state or redirect
    if (loading) {
        return <div>Loading...</div>;
    }

    // If on auth route or authenticated, show content
    if (isAuthRoute || isAuthenticated) {
        return children;
    }

    // This will briefly show before redirect happens
    return null;
}

export default function App({ children }) {
    return (
        <AuthProvider>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </AuthProvider>
    );
}