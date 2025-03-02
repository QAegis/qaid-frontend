import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white">
                <div className= "container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">
                        QAID Platform
                    </Link>
                    <nav className="flex gap-4">
                        <Link href="/" className="hover:text-gray-300">
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link href="/dashboard" className="hover:text-gray-300">
                                    Dashboard
                                </Link>
                                <button onClick={logout} className="hover:text-gray-300">
                                    Logout
                                </button>
                                <span className="text-gray-400">
                                    Hi, {user?.name}
                                </span>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-gray-300">
                                    Login
                                </Link>
                                <Link href="/register" className="hover:text-gray-300">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} QAID Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;