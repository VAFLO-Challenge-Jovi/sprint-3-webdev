import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicOnlyRoute from './routes/PublicOnlyRoute.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Scanner from './pages/Scanner.jsx';
import Historico from './pages/Historico.jsx';
import Perfil from './pages/Perfil.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Public:  /  (landing)  ·  /login  ·  404
 * Private: /app/scanner  ·  /app/historico  ·  /app/perfil
 */
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/app" element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="scanner" replace />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="historico" element={<Historico />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Route>

        {/* Sprint 3 URLs */}
        <Route path="/camera" element={<Navigate to="/app/scanner" replace />} />
        <Route path="/history" element={<Navigate to="/app/historico" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
