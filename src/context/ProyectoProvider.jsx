import { useContext, useState } from "react";
import { ProyectoContext } from "./ProyectoContext";
import { proyectoService } from "../service/ProyectoService";
import { toast } from "react-toastify";
import { DemoAuthContext } from "./DemoAuthContext";

export function ProyectoProvider({ children }) {
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { isAuthenticated, user } = useContext(DemoAuthContext);
  const [showProyectos, setShowProyectos] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [proyectoSeleccionadoEdit, setProyectoSeleccionadoEdit] = useState();

  async function handleGetProyectos() {
    setIsloading(true);
    if (!isAuthenticated || !user || !user.sub || !user) {
      toast.error("Error al obtener proyectos");
      setIsloading(false);
      return;
    }
    try {
      const data = await proyectoService.obtenerProyectoPorOrganizacionId(
        user.organizacionId
      );
      setProyectos(data);
      setShowProyectos(true);
      // console.log("Proyectos obtenidos exitosamente");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al obtener proyectos");
      console.error("Error al obtener proyectos");
      setErrorFetch(true);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <ProyectoContext.Provider
      value={{
        proyectos,
        isLoading,
        setIsloading,
        handleGetProyectos,
        showProyectos,
        errorFetch,
        setErrorFetch,
        showForm,
        setShowForm,
        proyectoSeleccionadoEdit,
        setProyectoSeleccionadoEdit,
      }}
    >
      {children}
    </ProyectoContext.Provider>
  );
}
