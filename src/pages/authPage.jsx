import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Authentication from '../components/auth/Authentication.jsx';

const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'login';

    return (
        <div className="auth-page">
            <Authentication initialMode={mode} />
        </div>
    );
};

export default AuthPage;