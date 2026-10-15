import { useContext } from 'react';
import { AuthContext } from '../context/contexts.js';

/** { user, isAuthenticated, login, register, logout } */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
}
