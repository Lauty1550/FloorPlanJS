import { useContext } from "react";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import { toast } from "react-toastify";

export default function useEtiquetasPlano() {
  const {
    setIsFullScreen,
    selectedEtiquetas,
    setSelectedEtiquetas,
    setEtiquetaFullScreen,
    setEtiquetaFullScreenArchivo,
    setDeleteEnable,
    setCantEtiquetasToDelete,
    setShowConfirmationModal,
  } = useContext(PlanoDetailContext);

  function handleEtiquetaClick(archivoEtiqueta) {
    setEtiquetaFullScreenArchivo(archivoEtiqueta);
    setEtiquetaFullScreen(true);
    setIsFullScreen(true);
  }

  function selectEtiquetaToDelete(id) {
    setSelectedEtiquetas((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((etiquetaId) => etiquetaId !== id)
        : [...prevSelected, id]
    );
  }

  function handleDeleteStart() {
    setDeleteEnable(true);
  }

  function handleDeleteCancel() {
    setDeleteEnable(false);
    setSelectedEtiquetas([]);
  }

  function handleConfirmDelete() {
    if (selectedEtiquetas.length > 0) {
      setCantEtiquetasToDelete(selectedEtiquetas.length.toString());
      setShowConfirmationModal(true);
    } else {
      toast.info("Seleccione al menos una etiqueta");
    }
  }

  return {
    handleEtiquetaClick,
    selectEtiquetaToDelete,
    handleDeleteStart,
    handleDeleteCancel,
    handleConfirmDelete,
  };
}
