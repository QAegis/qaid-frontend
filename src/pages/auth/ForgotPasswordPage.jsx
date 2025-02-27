import React, { useState } from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { requestPasswordReset } from '../../services/authService';

const ForgotPasswordPage = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (data) => {
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await requestPasswordReset(data.email);
            setMessage('Password reset link sent to your email address');
        } catch (err) {
            setError('Failed to send password reset email');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password
                </p>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                    {error}
                </div>
            )}

            {message && (
                <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">
                    {message}
                </div>
            )}

            <ForgotPasswordForm
                onSubmit={handleForgotPassword}
                isLoading={loading}
                message={message}
            />
        </>
    );
};

export default ForgotPasswordPage;