import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import GoogleButton from './GoogleButton';
import { validatePassword } from '../../utils/validation';

const RegisterForm = ({ onSubmit, isLoading }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
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

        onSubmit({ name, email, password });
    };

    return (
        <div className="space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
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
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Sign up'}
                    </button>
                </div>
            </form>

            <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                </div>
            </div>

            <GoogleButton onClick={() => { }} isLoading={isLoading} text="Sign up with Google" />

            <div className="text-sm text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/auth/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;