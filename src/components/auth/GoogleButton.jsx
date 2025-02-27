import React from 'react';

const GoogleButton = ({ onClick, isLoading, text }) => {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClick}
            disabled={isLoading}
        >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                    d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.54-7.793 9.71-11.899l-9.71 0.234z"
                    fill="#4285f4"
                />
            </svg>
            {text}
        </button>
    );
};

export default GoogleButton;