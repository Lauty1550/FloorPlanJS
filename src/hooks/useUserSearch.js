import { useEffect, useState } from "react";
import { userService } from "../service/UserService";
import { toast } from "react-toastify";

export default function useUserSearch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    handleGetUsuarios();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); // Actualizamos después del debounce
    }, 300);

    return () => clearTimeout(handler); // Limpiamos el temporizador
  }, [search]);

  async function handleGetUsuarios() {
    try {
      const data = await userService.obtenerUsuarios();
      setUsers(data);
      console.log("Datos obtenidos");
    } catch (error) {
      toast.error("Error al obtener usuarios");
      console.log("Error al obtener datos", error);
    }
  }

  return { users, search, setSearch, debouncedSearch };
}
