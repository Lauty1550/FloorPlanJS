import UserSearch from "./UserSearch";
import "../App.css";

export default function ListaUsuarios() {
  return (
    <UserSearch
      render={(filteredUsers) => (
        <div className="padding-mobile ">
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
                    Cargando
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
        </div>
      )}
    />
  );
}
