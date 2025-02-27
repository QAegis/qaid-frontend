import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import { validatePassword } from '../../utils/validation';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate password
        const passwordValidations = validatePassword(password);
        const isPasswordValid = Object.values(passwordValidations).every(Boolean);

        // Check if passwords match
        const doPasswordsMatch = password === confirmPassword;

        // If there are validation errors, show them
        if (!isPasswordValid || !doPasswordsMatch) {
            const newErrors = {};

            if (!isPasswordValid) {
                newErrors.password = 'Password must meet all requirements';
            }

            if (!doPasswordsMatch) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token, password);
            setMessage('Password reset successful');
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        } catch (err) {
            setErrors({ general: 'Password reset failed. The link may have expired.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
            </div>

            {errors.general && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                    {errors.general}
                </div>
            )}

            {message && (
                <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">
                    {message}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                        )}
                        {password && (
                            <div className="mt-2 space-y-1">
                                <PasswordStrengthIndicator validations={validatePassword(password)} />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm password
                    </label>
                    <div className="mt-1">
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className={`block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Resetting password...' : 'Reset password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordPage;