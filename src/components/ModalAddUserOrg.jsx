import UserSearch from "./UserSearch";
import "../css/Spin.css";
import "../css/ModalAddUser.css";
import useModalUserOrg from "../hooks/useModalUserOrg";

export default function ModalAddUserOrg({
  show,
  onClose,
  organizacionId,
  organizacionName,
}) {
  const { isAdding, handleAddUser, handleDeleteUserFromOrg, handleLockUser } =
    useModalUserOrg({ organizacionId });

  if (!show) return null;

  return (
    <main
      className="modal modal-organizacion-users fade show"
      style={{ display: "block" }}
      tabIndex={-1}
      aria-labelledby="ModalAddUserOrg"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="addUserModalOrgLabel">
              Agregar usuarios a la organizacion {organizacionName}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <h5>Lista de usuarios:</h5>
            <div className="user-search-div">
              <UserSearch
                render={(filteredUsers) => (
                  <table className="table table-striped table-users">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center">
                            No se encontraron usuarios
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.organizacionId != null &&
                              organizacionId !== user.organizacionId ? (
                                <button
                                  className="btn-user-org btn-lock-user-org"
                                  onClick={() =>
                                    handleLockUser(user.organizacionName)
                                  }
                                  title="Bloqueado"
                                >
                                  <i className="bi bi-person-fill-lock"></i>
                                </button>
                              ) : organizacionId === user.organizacionId ? (
                                <button
                                  className="btn-user-org btn-delete-user-org"
                                  onClick={() =>
                                    handleDeleteUserFromOrg(user.id)
                                  }
                                  disabled={isAdding === user.id}
                                  title="Desvincular"
                                >
                                  {isAdding === user.id ? (
                                    <i className="bi bi-arrow-repeat spin"></i>
                                  ) : (
                                    <i className="bi bi-person-dash"></i>
                                  )}
                                </button>
                              ) : (
                                <button
                                  className="btn-user-org btn-add-user-org"
                                  onClick={() => handleAddUser(user.id)}
                                  disabled={isAdding === user.id}
                                  title="Agregar"
                                >
                                  {isAdding === user.id ? (
                                    <i className="bi bi-arrow-repeat spin"></i>
                                  ) : (
                                    <i className="bi bi-person-fill-add"></i>
                                  )}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
