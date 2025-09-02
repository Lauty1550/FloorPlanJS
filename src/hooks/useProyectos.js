import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { userService } from "../service/UserService";
import { ProyectoContext } from "../context/ProyectoContext";

export default function useProyectos() {
  const {
    usuario,
    setUsuario,
    handleGetProyectos,
    setIsloading,
    setErrorFetch,
  } = useContext(ProyectoContext);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    setErrorFetch(false);
    handleGetUser();
  }, []);

  useEffect(() => {
    if (usuario) {
      handleGetProyectos();
    }
  }, [usuario]);

  async function handleGetUser() {
    if (!isAuthenticated || !user || !user.sub) {
      console.log("No user");
      setIsloading(false);
      return;
    }
    try {
      const userOrg = await userService.obtenerPorAuth0Id(user.sub);
      if (userOrg) {
        setUsuario(userOrg);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      toast.error("Error al obtener proyectos");
      setErrorFetch(true);
      setIsloading(false);
    }
  }
}
