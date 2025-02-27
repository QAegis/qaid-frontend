import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { login, googleLogin } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { auth, provider } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleLogin = async (data) => {
        setError('');
        setLoading(true);

        try {
            const success = await login(data.email, data.password);
            if (success) {
                const user = await fetchCurrentUser();
                setCurrentUser(user);
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                setCurrentUser(user);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Google login failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                    {error}
                </div>
            )}

            <LoginForm
                onSubmit={handleLogin}
                isLoading={loading}
                onGoogleLogin={handleGoogleLogin}
            />
        </>
    );
};

export default LoginPage;
