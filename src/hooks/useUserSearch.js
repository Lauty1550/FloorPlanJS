import { useContext, useEffect, useState } from "react";
import { userService } from "../service/UserService";
import { toast } from "react-toastify";
import { OrganizacionContext } from "../context/OrganizacionContext";

export default function useUserSearch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { updateUsers } = useContext(OrganizacionContext);

  useEffect(() => {
    handleGetUsuarios();
  }, [updateUsers]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); // Actualiza después del debounce
    }, 300);

    return () => clearTimeout(handler); // Limpia el temporizador
  }, [search]);

  async function handleGetUsuarios() {
    try {
      const data = await userService.obtenerUsuarios();
      setUsers(data);
      // console.log("Datos obtenidos");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al obtener usuarios");
      console.error("Error al obtener datos");
    }
  }

  return { users, search, setSearch, debouncedSearch };
}
