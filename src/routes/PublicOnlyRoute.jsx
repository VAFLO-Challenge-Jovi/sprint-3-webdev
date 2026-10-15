import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { safeRedirect } from '../utils/redirect.js';

/**
 * Pages that make no sense when logged in (login/register). Right after a
 * successful login this guard is what sends the user to `?redirect=` or /app.
 */
export default function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth();
  const [params] = useSearchParams();
  return isAuthenticated ? <Navigate to={safeRedirect(params.get('redirect'))} replace /> : <Outlet />;
}
