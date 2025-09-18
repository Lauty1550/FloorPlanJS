import { useState } from "react";
import { OrganizacionContext } from "./OrganizacionContext";
import { toast } from "react-toastify";
import { organizacionService } from "../service/OrganizacionService";

export default function OrganizacionProvider({ children }) {
  const [organizaciones, setOrganizaciones] = useState([]);
  const [organizacionSeleccionadaEdit, setOrganizacionSeleccionadaEdit] =
    useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updateUsers, setUpdateUsers] = useState(false);

  async function handleGetOrganizaciones() {
    try {
      setIsLoading(true);
      const data = await organizacionService.obtenerOrganizaciones();
      setOrganizaciones(data);
      console.log("Organizaciones obtenidas");
    } catch (error) {
      toast.error("Error al obtener organizaciones");
      console.log("Error al obtener organizaciones", error);
      setErrorFetch(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <OrganizacionContext.Provider
      value={{
        organizaciones,
        setOrganizaciones,
        organizacionSeleccionadaEdit,
        setOrganizacionSeleccionadaEdit,
        handleGetOrganizaciones,
        isLoading,
        setIsLoading,
        errorFetch,
        setErrorFetch,
        showForm,
        setShowForm,
        updateUsers,
        setUpdateUsers,
      }}
    >
      {children}
    </OrganizacionContext.Provider>
  );
}
