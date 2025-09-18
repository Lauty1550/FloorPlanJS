import { useContext } from "react";
import { Link } from "react-router";
import { PlanoContext } from "../context/PlanoContext";
import useListaPlanos from "../hooks/useListaPlanos";

export default function ListaPlanos() {
  const { planos, deleteEnable, isLoading, proyecto, selectedPlanos } =
    useContext(PlanoContext);

  const { selectPlanoToDelete } = useListaPlanos();

  return (
    <>
      {!isLoading && (
        <section>
          {planos.length > 0 ? (
            <div className="container-plano">
              <div className="row">
                {planos.map((plano) => (
                  <div
                    key={plano.id}
                    className="mt-5 col-md-6"
                    onClick={() => selectPlanoToDelete(plano.id)}
                  >
                    <div className="card">
                      {deleteEnable ? (
                        <div
                          className={`card-body-proyecto  ${
                            selectedPlanos.includes(plano.id)
                              ? "selected-card"
                              : ""
                          }`}
                        >
                          <h5 className="card-title">{plano.especialidad}</h5>

                          {plano.archivoUrl && plano.preview && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                className="preview-image"
                                src={plano.preview}
                                alt="Vista previa del archivo"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={`/plano/${plano.id}`}
                          state={{ proyectoNombre: proyecto.nombreProyecto }}
                          className="card"
                        >
                          <div className="card-body-proyecto">
                            <h5 className="card-title">{plano.especialidad}</h5>

                            {plano.archivoUrl && plano.preview && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  className="preview-image"
                                  src={plano.preview}
                                  alt="Vista previa del archivo"
                                  style={{ maxWidth: "100%", height: "auto" }}
                                />
                              </div>
                            )}
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className="mt-5"> El proyecto no posee planos</h1>
          )}
        </section>
      )}
    </>
  );
}
