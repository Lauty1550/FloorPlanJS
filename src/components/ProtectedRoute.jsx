import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import SpinLoader from "./Loader";

// eslint-disable-next-line no-unused-vars
export default function ProtectedRoute({ component: Component }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
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
      {isAuthenticated ? <Component /> : null}
    </div>
  );
}
