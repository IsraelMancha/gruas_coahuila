import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";
import Registros from "../features/registros/RegistrosList";
import NotFound from "../components/notFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import Ubicaciones from "../features/ubicaciones/Ubicaciones";
import AgregarRegistro from "../features/registros/AgregarRegistro";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas con el layout principal */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registros"
            element={
              <ProtectedRoute>
                <Registros />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ubicaciones"
            element={
              <ProtectedRoute>
                <Ubicaciones />
              </ProtectedRoute>
            }
          />
          <Route path="/agregarRegistro" element={<AgregarRegistro />} />
        </Route>
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
