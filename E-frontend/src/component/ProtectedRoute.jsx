import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../axios';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Assuming you have an endpoint to check auth status, reusing check-auth from backend
                // If not, we can try to hit a protected endpoint or check for potential session existence
                // Based on authController.js, there is a '/check-auth' endpoint
                const res = await api.get('/check-auth');
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        // Loading state
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
