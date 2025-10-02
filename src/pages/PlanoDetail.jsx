import { useContext } from "react";
import ModalDelete from "../components/ModalDelete";
import Toast from "../components/Toast";
import SpinLoader from "../components/Loader";
import "../css/PlanoDetail.css";
import "../css/Zoom.css";
import "../css/FullScreen.css";
import "react-image-crop/src/ReactCrop.scss";
import "cropperjs/dist/cropper.css";
import NewEtiqueta from "../components/NewEtiqueta";
import RenderPlano from "../components/RenderPlano";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import EtiquetasPlano from "../components/EtiquetasPlano";
import usePlanoDetail from "../hooks/usePlanoDetail";

export default function PlanoDetail() {
  const {
    planoRender,
    showForm,
    cantEtiquedasToDelete,
    showConfirmationModal,
    setShowConfirmationModal,
  } = useContext(PlanoDetailContext);

  const {
    id,
    isLoading,
    proyectoNombre,
    cropperClear,
    handleCloseForm,
    handleGetPlano,
    deleteEtiquetas,
  } = usePlanoDetail();

  if (!planoRender && !isLoading) {
    return <h1 className="titulo-page mb-5"> Error al obtener plano</h1>;
  }

  return (
    <>
      <Toast />
      <SpinLoader isLoading={isLoading} />
      <main
        className={`table-container ${isLoading ? "invisible" : "visible"} `}
      >
        {showForm && (
          <NewEtiqueta
            planoId={id}
            onClose={handleCloseForm}
            clear={cropperClear}
            onUpdate={() => handleGetPlano(id)}
          />
        )}
        <h1 className="titulo-page mb-5">
          Plano <span className="titulo-azul">{planoRender?.especialidad}</span>{" "}
          del proyecto <span className="titulo-azul">{proyectoNombre}</span>{" "}
        </h1>
        <RenderPlano />;
        <EtiquetasPlano />
        <ModalDelete
          show={showConfirmationModal}
          schemaName="etiqueta(s)"
          onClose={() => setShowConfirmationModal(false)}
          leyenda={cantEtiquedasToDelete}
          onDelete={deleteEtiquetas}
        />
      </main>
    </>
  );
}
