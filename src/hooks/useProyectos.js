import { useContext, useEffect } from "react";
import { ProyectoContext } from "../context/ProyectoContext";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function useProyectos() {
  const { handleGetProyectos } = useContext(ProyectoContext);

  useEffect(() => {
    handleGetProyectos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async function handleGetUser() {
  //   if (!isAuthenticated || !user || !user.sub) {
  //     console.log("No user");
  //     setIsloading(false);
  //     return;
  //   }
  //   try {
  //     setUsuario(user);
  //   } catch (error) {
  //     console.error("Error al obtener el usuario: ", error);
  //     toast.error("Error al obtener proyectos");
  //     setErrorFetch(true);
  //     setIsloading(false);
  //   }
  // }
}
