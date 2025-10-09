import ModalDelete from "./ModalDelete";
import SpinLoader from "./Loader";
import ButtonAdd from "./ButtonAdd";
import NewResponsableForm from "./NewResponsableForm";
import useProjectWorkersModal from "../hooks/useProjectWorkersModal";
import Toast from "../components/Toast";
import ListaTrabajadoresProyecto from "./ListaTrabajadoresProyecto";

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
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Cuerpo del modal */}
            <ListaTrabajadoresProyecto
              errorFetch={errorFetch}
              isLoading={isLoading}
              responsablesArray={responsablesArray}
              role={role}
              setWorkerDelete={setWorkerDelete}
            />

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

              {(role === "Dirección Técnica" || role === "Proyectistas") &&
                !isLoading &&
                !errorFetch && (
                  <ButtonAdd
                    onClick={handleShowModal}
                    text={`Agregar ${role}`}
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
