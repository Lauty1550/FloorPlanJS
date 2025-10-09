import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ProyectoContext } from "../context/ProyectoContext";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function useProyectos() {
  const {
    usuario,
    setUsuario,
    handleGetProyectos,
    setIsloading,
    setErrorFetch,
  } = useContext(ProyectoContext);
  const { isAuthenticated, user } = useContext(DemoAuthContext);

  useEffect(() => {
    setErrorFetch(false);
    handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usuario) {
      handleGetProyectos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  async function handleGetUser() {
    if (!isAuthenticated || !user || !user.sub) {
      console.log("No user");
      setIsloading(false);
      return;
    }
    try {
      setUsuario(user);
    } catch (error) {
      console.error("Error al obtener el usuario: ", error);
      toast.error("Error al obtener proyectos");
      setErrorFetch(true);
      setIsloading(false);
    }
  }
}
