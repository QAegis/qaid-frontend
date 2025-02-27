import React from 'react';

const PasswordStrengthIndicator = ({ validations }) => {
    const requirements = [
        { key: 'minLength', label: 'At least 8 characters' },
        { key: 'hasUppercase', label: 'At least one uppercase letter' },
        { key: 'hasLowercase', label: 'At least one lowercase letter' },
        { key: 'hasNumber', label: 'At least one number' },
        { key: 'hasSpecial', label: 'At least one special character' }
    ];

    const getStrength = () => {
        const score = Object.values(validations).filter(Boolean).length;
        if (score === 5) return { label: 'Strong', color: 'bg-green-500' };
        if (score >= 3) return { label: 'Moderate', color: 'bg-yellow-500' };
        return { label: 'Weak', color: 'bg-red-500' };
    };

    const strength = getStrength();

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                        className={`h-full rounded-full ${strength.color}`}
                        style={{ width: `${(Object.values(validations).filter(Boolean).length / 5) * 100}%` }}
                    />
                </div>
                <span className="text-xs font-medium text-gray-700">{strength.label}</span>
            </div>

            <ul className="text-xs space-y-1 text-gray-600">
                {requirements.map((req) => (
                    <li key={req.key} className="flex items-center">
                        {validations[req.key] ? (
                            <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="7.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
                            </svg>
                        )}
                        {req.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordStrengthIndicator;