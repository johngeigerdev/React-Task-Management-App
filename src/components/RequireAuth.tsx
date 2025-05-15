import React, { Children } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
    children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0;

    if (isLoading) return <p>Loading...</p>

    //return back to home if user is not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    //return children components if user is authenticated
    return children
};

export default RequireAuth;