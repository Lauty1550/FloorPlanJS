import { useEffect, useState } from "react";
import UserSearch from "../components/UserSearch";
import SpinLoader from "../components/Loader";
import Toast from "../components/Toast";

export default function Usuarios() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  function handleAvisar() {}

  return (
    <main className="text-center">
      <Toast />
      {isLoading && <SpinLoader isLoading={true} />}
      <div className={`table-container ${isLoading ? "invisible" : "visible"}`}>
        <h1 className="titulo-page mt-5">Usuarios</h1>
        <UserSearch
          render={(filteredUsers) => (
            <table className="table table-striped mt-3 text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Organizacion</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No hay usuarios
                    </td>
                  </tr>
                ) : (
                  //Mostrar usuarios
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.organizacionName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
          updateUsers={handleAvisar}
        />
      </div>
    </main>
  );
}
