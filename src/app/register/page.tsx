'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layouts/MainLayout';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await register({ name, email, password });
            router.push('/login?registered=true');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Registration failed');
            }
        }
    };

    return (
        <MainLayout>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
