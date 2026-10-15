import { createContext } from 'react';

/** Context objects live apart from their providers (keeps Fast Refresh working). */
export const AuthContext = createContext(null);
export const ToastContext = createContext(null);
