import ModalDelete from "./ModalDelete";
import SpinLoader from "./Loader";
import DeleteIconButton from "../img/DeleteIcon";
import ButtonAdd from "./ButtonAdd";
import NewResponsableForm from "./NewResponsableForm";
import useProjectWorkersModal from "../hooks/useProjectWorkersModal";
import Toast from "../components/Toast";

export default function ProjectWorkersModal({
  show,
  onClose,
  role,
  proyectoId,
}) {
  const {
    errorFetch,
    handleCloseModal,
    handleDelete,
    handleShowModal,
    isLoading,
    responsables,
    workerDelete,
    setWorkerDelete,
    showModal,
  } = useProjectWorkersModal({ proyectoId, role });

  if (!show) return null;

  const responsablesArray = Array.isArray(responsables)
    ? responsables
    : responsables
    ? [responsables]
    : [];

  return (
    <>
      <Toast />
      <SpinLoader
        isLoading={isLoading}
        style={{ width: "100px", height: "100px" }}
      />
      {/* Overlay */}
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        tabIndex={-1}
      ></div>
      {/* Modal principal */}
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        aria-labelledby="workersModalLabel"
      >
        <div
          className="modal-dialog modal-dialog-centered overflow-auto modal-xl"
          style={{
            maxWidth: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Gestión de {role}</h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Cuerpo del modal */}
            {errorFetch ? (
              <div className="modal-body text-center">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ocurrió un error al cargar los datos.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div
                className={`modal-body text-center table-container ${
                  isLoading ? "invisible" : "visible"
                }`}
              >
                <div style={{ maxHeight: "5000px", overflowY: "auto" }}>
                  <div className="table-responsive">
                    <table className="table table-striped mt-3 oveflow-auto">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>dni</th>
                          <th>domicilio</th>
                          {(role === "Dirección Técnica" ||
                            role === "Proyectistas") && (
                            <>
                              <th>Matricula provincial</th>
                              <th>Matricula municipal</th>
                            </>
                          )}
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {responsablesArray.length === 0 ? (
                          <>
                            <tr>
                              <td colSpan={6} className="text-center">
                                El proyecto no posee {role}
                              </td>
                            </tr>
                          </>
                        ) : (
                          responsablesArray.map((user) => (
                            <tr key={user?._id}>
                              <td>{user?.nombreCompleto || "No indicado"}</td>
                              <td>{user?.dni || "No indicado"}</td>
                              <td>{user?.domicilio || "No indicado"}</td>
                              {(role === "Dirección Técnica" ||
                                role === "Proyectistas") && (
                                <>
                                  <td>
                                    {user.matriculaProvincial || "No indicado"}
                                  </td>
                                  <td>
                                    {user.matriculaMunicipal || "No indicado"}
                                  </td>
                                </>
                              )}
                              <td>
                                <DeleteIconButton
                                  onClick={() => setWorkerDelete(user)}
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Footer del modal */}
            <div className="modal-footer">
              {responsablesArray.length === 0 &&
                role === "Propietario" &&
                !isLoading &&
                !errorFetch && (
                  <ButtonAdd
                    onClick={handleShowModal}
                    text="Agregar Propietario"
                    type="button"
                  />
                )}

              {role === "Dirección Técnica" && !isLoading && !errorFetch && (
                <ButtonAdd
                  onClick={handleShowModal}
                  text="Agregar Direccion Tecnica"
                  type="button"
                />
              )}

              {role === "Proyectistas" && !isLoading && !errorFetch && (
                <ButtonAdd
                  onClick={handleShowModal}
                  text="Agregar Proyectista"
                  type="button"
                />
              )}

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
      {showModal && (
        <NewResponsableForm
          onClose={handleCloseModal}
          proyectoId={proyectoId}
          role={role}
        />
      )}
      <ModalDelete
        show={!!workerDelete}
        onClose={() => setWorkerDelete(null)}
        onDelete={() => handleDelete()}
        leyenda={
          role === "Proyectistas" ? "el/la proyectista" : "el/la " + role
        }
        schemaName={workerDelete?.nombreCompleto || ""}
      />
    </>
  );
}
