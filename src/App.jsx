// Configuración del worker de PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import ProyectoPage from "./pages/Proyectos";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProyectoProvider } from "./context/ProyectoProvider";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Ruta catch-all para 404 */}
          <Route path="*" element={<NotFound />} />

          <Route path="/home" element={<Home />} />

          <Route
            path="/proyectos"
            element={
              <ProtectedRoute>
                <ProyectoProvider>
                  <ProyectoPage />
                </ProyectoProvider>
              </ProtectedRoute>
            }
          />

          {/*
          <Route
            path="/usuarios"
            element={<ProtectedAdminRoute element={Usuarios} />}
          />
          <Route
            path="/organizaciones"
            element={<ProtectedAdminRoute element={OrganizacionesPage} />}
          />
          <Route
            path="/proyectos/:id"
            element={<ProtectedRoute element={ProyectoDetail} />}
          />
          <Route
            path="/plano/:id"
            element={<ProtectedRoute element={PlanoDetail} />}
          />
          <Route
            path="/proyecto/:id/responsables"
            element={<ProtectedRoute element={ProjectWorkers} />}
          /> */}
        </Routes>
      </main>
    </Router>
  );
}
