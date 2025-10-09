import { useContext } from "react";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import useEtiquetasPlano from "../hooks/useEtiquetasPlano.js";
import DeleteIconButton from "../img/DeleteIcon";
import CancelIcon from "../img/CancelIcon";
import ConfirmIcon from "../img/confirmIcon";

export default function EtiquetasPlano() {
  const { etiquetas, deleteEnable, selectedEtiquetas } =
    useContext(PlanoDetailContext);
  const {
    handleEtiquetaClick,
    selectEtiquetaToDelete,
    handleDeleteCancel,
    handleDeleteStart,
    handleConfirmDelete,
  } = useEtiquetasPlano();

  return (
    <>
      <div>
        <h2 className="mt-5 titulo-page">Etiquetas</h2>
        {etiquetas.length > 0 && (
          <div style={{ display: "inline-flex", gap: "10px" }}>
            <button
              className={`${
                deleteEnable ? "cancel-button " : "transparent-button"
              } `}
              onClick={handleDeleteCancel}
              title="Cancelar"
            >
              <CancelIcon color="black" />
            </button>

            <DeleteIconButton
              onClick={handleDeleteStart}
              className="margen-derecha"
            />

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
        )}
      </div>
      <section>
        {etiquetas.length > 0 ? (
          <div className="container-plano">
            <div className="row">
              {etiquetas.map((etiqueta) =>
                deleteEnable ? (
                  <div
                    key={etiqueta.id}
                    className=" mt-5 col-md-6"
                    onClick={() => selectEtiquetaToDelete(etiqueta.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card">
                      <div
                        className={`card-body-proyecto  ${
                          selectedEtiquetas.includes(etiqueta.id)
                            ? "selected-card"
                            : ""
                        }`}
                      >
                        <h5 className="card-title">{etiqueta.nombre}</h5>

                        {etiqueta.archivoUrl && etiqueta.archivoUrl.url && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              className="preview-image"
                              src={etiqueta.archivoUrl.url}
                              alt="Vista previa"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={etiqueta.id}
                    className=" mt-5 col-md-6"
                    onClick={() => handleEtiquetaClick(etiqueta.archivoUrl.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card">
                      <div className="card-body-proyecto">
                        <h5 className="card-title">{etiqueta.nombre}</h5>

                        {etiqueta.archivoUrl && etiqueta.archivoUrl.url && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              className="preview-image"
                              src={etiqueta.archivoUrl.url}
                              alt="Vista previa"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <h1 className="mt-5 text-white"> El plano no posee etiquetas</h1>
        )}
      </section>
    </>
  );
}
