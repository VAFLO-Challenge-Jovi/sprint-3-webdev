import { useCallback, useMemo } from 'react';
import { AuthContext } from './contexts.js';
import { usersApi } from '../services/api/index.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { sha256 } from '../utils/crypto.js';

const SESSION_KEY = 'seekvision_session';

/**
 * Session lives in localStorage ({ id, name, email } — never the password).
 * Credentials are checked against the users resource of the API.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(SESSION_KEY, null);

  const login = useCallback(
    async ({ email, password }) => {
      const account = await usersApi.findByEmail(email.trim());
      if (!account || account.passwordHash !== (await sha256(password))) {
        throw new Error('E-mail ou senha incorretos.');
      }
      const session = { id: String(account.id), name: account.name, email: account.email };
      setUser(session);
      return session;
    },
    [setUser],
  );

  const register = useCallback(
    async ({ name, email, password }) => {
      if (await usersApi.findByEmail(email.trim())) {
        throw new Error('Já existe uma conta com este e-mail.');
      }
      const account = await usersApi.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: await sha256(password),
        createdAt: new Date().toISOString(),
      });
      const session = { id: String(account.id), name: account.name, email: account.email };
      setUser(session);
      return session;
    },
    [setUser],
  );

  const logout = useCallback(() => {
    // Clear storage right away (the hook persists in an effect, after the next commit).
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // storage unavailable — state below still logs the user out
    }
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
