import { useContext, useEffect } from "react";
import SpinLoader from "./Loader";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } =
    useContext(DemoAuthContext);
  // Si el usuario no está autenticado, redirigir a la página de login de Auth0
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  // Si está autenticado, renderizar el componente protegido
  return (
    <div>
      <SpinLoader isLoading={isLoading} />
      {isAuthenticated ? children : null}
    </div>
  );
}
