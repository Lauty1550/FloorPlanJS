import DeleteIconButton from "../img/DeleteIcon";

export default function ListaTrabajadoresProyecto({
  errorFetch,
  isLoading,
  role,
  responsablesArray,
  setWorkerDelete,
}) {
  return (
    <>
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
                            <td>{user.matriculaProvincial || "No indicado"}</td>
                            <td>{user.matriculaMunicipal || "No indicado"}</td>
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
      ;
    </>
  );
}
