import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../functions/isAdmin";
import SpinLoader from "./Loader";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useContext(DemoAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin({ isAuthenticated, user }) && !isLoading) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, user]);

  // Si está autenticado, renderizar el componente protegido
  return (
    <div>
      <SpinLoader isLoading={isLoading} />
      {isAdmin({ isAuthenticated, user }) ? children : null}
    </div>
  );
}
