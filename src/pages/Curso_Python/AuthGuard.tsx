import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mientras se verifica el estado de autenticación, muestra un loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#00BFA5] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/auth/ingresa" state={{ from: location }} replace />;
  }

  // Si hay usuario, renderiza el contenido protegido
  return <>{children}</>;
};

export default AuthGuard;
