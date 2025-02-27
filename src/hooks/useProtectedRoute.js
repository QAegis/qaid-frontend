import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export function useProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    
    const isAuthRoute = pathname === '/login' || pathname === '/register';

    useEffect(() => {
        if (!loading && !isAuthenticated && !isAuthRoute) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router, isAuthRoute]);
    
    return { isAuthenticated, loading };
}
