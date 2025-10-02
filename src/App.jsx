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
import Usuarios from "./pages/Usuarios";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Organizaciones from "./pages/Organizaciones";
import OrganizacionProvider from "./context/OrganizacionProvider";
import ProyectoTrabajadores from "./pages/ProyectoTrabajadores";
import ProyectoDetail from "./pages/ProyectoDetail";
import PlanoProvider from "./context/PlanoProvider";
import DemoAuthProvider from "./context/DemoAuthProvider";
import PlanoDetail from "./pages/PlanoDetail";
import PlanoDetailProvider from "./context/PlanoDetailProvider";

export default function App() {
  return (
    <Router>
      <DemoAuthProvider>
        <Header />
        <PlanoProvider>
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

              <Route
                path="/usuarios"
                element={
                  <ProtectedAdminRoute>
                    <OrganizacionProvider>
                      <Usuarios />
                    </OrganizacionProvider>
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="/organizaciones"
                element={
                  <ProtectedAdminRoute>
                    <OrganizacionProvider>
                      <Organizaciones />
                    </OrganizacionProvider>
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="/proyecto/:id/responsables"
                element={
                  <ProtectedRoute>
                    <ProyectoTrabajadores />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/proyectos/:id"
                element={
                  <ProtectedRoute>
                    <ProyectoDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/plano/:id"
                element={
                  <ProtectedRoute>
                    <PlanoDetailProvider>
                      <PlanoDetail />
                    </PlanoDetailProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </PlanoProvider>
      </DemoAuthProvider>
    </Router>
  );
}
