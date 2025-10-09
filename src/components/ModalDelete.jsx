import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalDelete({
  show,
  onClose,
  onDelete,
  schemaName,
  leyenda,
}) {
  if (!show) return null;

  return (
    <>
      {/* Overlay del fondo */}
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        tabIndex={-1}
      ></div>

      {/* Modal principal */}
      <main
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        aria-labelledby="deleteModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                ¿Está seguro de que quiere eliminar {leyenda}{" "}
                <span style={{ color: "red" }}>{schemaName}</span>?<br />
                Esta acción no se puede deshacer.
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
