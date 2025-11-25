import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthChange, logoutUser } from '../firebase/firebase';

// ===== TIPOS =====
interface User {
  uid: string;
  email?: string; // ← Cambiar de `string | null` a `string` opcional
  name?: string;
  role?: 'admin' | 'student'; // ← AGREGAR ESTA LÍNEA
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// ===== CONTEXTO =====
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== PROVIDER =====
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    // Limpiar el listener al desmontar
    return () => unsubscribe();
  }, []);

  // Función de logout
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ===== HOOK PERSONALIZADO =====
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};



