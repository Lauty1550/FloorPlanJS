import SpinLoader from "../components/Loader";
import "../css/PlanosRow.css";
import Toast from "../components/Toast";
import "../css/BackButton.css";
import "../css/ProyectoDetail.css";
import ModalDelete from "../components/ModalDelete";
import NewPlano from "../components/NewPlano";
import useProyectoDetail from "../hooks/useProyectoDetail";
import ListaPlanos from "../components/ListaPlanos";
import HeaderProyectoDetail from "../components/HeaderProyectoDetail";
import { useContext } from "react";
import { PlanoContext } from "../context/PlanoContext";

export default function ProyectoDetail() {
  const { id, handleGetProyecto, deletePlanos } = useProyectoDetail();

  const {
    isLoading,
    proyecto,
    cantPlanosToDelete,
    showForm,
    showConfirmationModal,
    setShowConfirmationModal,
  } = useContext(PlanoContext);

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
            file={null}
            proyectoId={id}
            onUpdate={() => handleGetProyecto(id)}
          />
        )}

        <HeaderProyectoDetail />

        <ListaPlanos />

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
