import { useEffect, useState } from "react";
import { userService } from "../service/UserService";
import { toast } from "react-toastify";

export default function UserSearch({ render, updateUsers }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    handleGetUsuarios();
  }, [updateUsers]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); // Actualizamos después del debounce
    }, 400);

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

  // Filtrar usuarios
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          marginTop: "5px",
          padding: "3px ",
        }}
      >
        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "5px",
            width: "300px",
          }}
        />
      </div>
      {/* Renderizar el contenido con los usuarios */}
      {render(filteredUsers)}
    </div>
  );
}
