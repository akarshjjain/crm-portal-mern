import React from 'react'
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({children, requiredRole}) => {
    const { user, loading } = useAuth();
  if (loading) {
    return <div className="h-screen flex items-center justify-center text-2xl font-bold">Loading...</div>;
  }
    if(!requiredRole.includes(user.role)){
        return <Navigate to="/unauthorized" />
    }
    return user ? children : <Navigate to= "/login" />
}

export default RoleBaseRoutes
