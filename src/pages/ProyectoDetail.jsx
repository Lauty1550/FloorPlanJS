import SpinLoader from "../components/Loader";
import ButtonAdd from "../components/ButtonAdd";
import { Link } from "react-router-dom";
import "../css/PlanosRow.css";
import Toast from "../components/Toast";
import BackArrowIcon from "../img/BackArrowSVG";
import "../css/BackButton.css";
import DeleteIconButton from "../img/DeleteIcon";
import "../css/ProyectoDetail.css";
import CancelIcon from "../img/CancelIcon";
import ConfirmIcon from "../img/confirmIcon";
import ModalDelete from "../components/ModalDelete";
import NewPlano from "../components/NewPlano";
import useProyectoDetail from "../hooks/useProyectoDetail";

export default function ProyectoDetail() {
  const {
    id,
    handleGetProyecto,
    cantPlanosToDelete,
    deleteEnable,
    deletePlanos,
    handleAddPlano,
    handleCloseForm,
    handleConfirmDelete,
    handleDeleteCancel,
    handleDeleteStart,
    isLoading,
    planos,
    proyecto,
    selectPlanoToDelete,
    showConfirmationModal,
    showForm,
    selectedPlanos,
    setShowConfirmationModal,
  } = useProyectoDetail();

  if (!proyecto) {
    return (
      <>
        <main
          className={`table-container ${isLoading ? "invisible" : "visible"}`}
        >
          <h1 className="titulo-page mb-5"> No se encontró proyecto</h1>;
        </main>
      </>
    );
  }

  return (
    <>
      <Toast />
      <SpinLoader isLoading={isLoading} />
      <main
        className={`text-center mt-3  "container-fluid"
         table-container ${isLoading ? "invisible" : "visible"}`}
      >
        <h1 className="titulo-page mb-5">
          Proyecto {""}
          <span className="titulo-azul"> {proyecto.nombreProyecto} </span>
        </h1>

        {showForm && id && (
          <NewPlano
            clear={() => {}}
            file={null}
            proyectoId={id}
            onClose={handleCloseForm}
            onUpdate={() => handleGetProyecto(id)}
          />
        )}

        <div className="action-bar overflow-auto">
          <div className="center-buttons">
            <Link to="/proyectos" className="back-button">
              <button className="back-button" title="Volver">
                <BackArrowIcon color="black" />
              </button>
            </Link>

            <ButtonAdd
              onClick={handleAddPlano}
              text="Agregar Plano"
              type="button"
            />
          </div>

          <div className="derecha">
            <button
              className={`${
                deleteEnable ? "cancel-button " : "transparent-button"
              } `}
              onClick={handleDeleteCancel}
              title="Cancelar"
            >
              <CancelIcon color="black" />
            </button>

            {planos.length > 0 && (
              <DeleteIconButton
                onClick={handleDeleteStart}
                className="margen-derecha"
              />
            )}

            <button
              className={`${
                deleteEnable ? "cancel-button " : "transparent-button"
              } `}
              onClick={handleConfirmDelete}
              title="Confirmar"
            >
              <ConfirmIcon color="red" />
            </button>
          </div>
        </div>

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
                              <h5 className="card-title">
                                {plano.especialidad}
                              </h5>

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
        <ModalDelete
          show={showConfirmationModal}
          schemaName="plano(s)"
          onClose={() => setShowConfirmationModal(false)}
          leyenda={cantPlanosToDelete}
          onDelete={deletePlanos}
        />
      </main>
    </>
  );
}
