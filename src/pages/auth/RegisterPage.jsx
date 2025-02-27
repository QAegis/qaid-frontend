import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { register, googleLogin } from '../../services/authService';

const RegisterPage = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        setError('');
        setLoading(true);

        try {
            const success = await register(data.name, data.email, data.password);
            if (success) {
                navigate('/auth/login', {
                    state: { message: 'Registration successful! Please log in.' }
                });
            } else {
                setError('Registration failed');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred during registration');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        // Google signup implementation
    };

    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                    {error}
                </div>
            )}

            <RegisterForm
                onSubmit={handleRegister}
                isLoading={loading}
                onGoogleSignup={handleGoogleSignup}
            />
        </>
    );
};

export default RegisterPage;