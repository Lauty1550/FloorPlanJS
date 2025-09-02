import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../functions/isAdmin";
import SpinLoader from "./Loader";

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin({ isAuthenticated, user }) && !isLoading) {
      navigate("/home");
    }
  }, [isAuthenticated, isLoading, user]);

  // Si está autenticado, renderizar el componente protegido
  return (
    <div>
      <SpinLoader isLoading={isLoading} />
      {isAdmin({ isAuthenticated, user }) ? children : null}
    </div>
  );
}
