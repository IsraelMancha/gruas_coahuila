import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";
import Registros from "../features/registros/RegistrosList";
import NotFound from "../components/notFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import Ubicaciones from "../features/ubicaciones/Ubicaciones";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas con el layout principal */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registros" element={<Registros />} />
          <Route path="/ubicaciones" element={<Ubicaciones />} />
        </Route>
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
