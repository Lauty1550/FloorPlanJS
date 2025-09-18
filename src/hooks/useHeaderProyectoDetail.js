import { useContext } from "react";
import { toast } from "react-toastify";
import { PlanoContext } from "../context/PlanoContext";

export default function useHeaderProyectoDetail() {
  const {
    setDeleteEnable,
    selectedPlanos,
    setSelectedPlanos,
    setCantPlanosToDelete,
    setShowForm,
    setShowConfirmationModal,
  } = useContext(PlanoContext);

  async function handleAddPlano() {
    setShowForm(true);
  }

  function handleConfirmDelete() {
    if (selectedPlanos.length > 0) {
      setCantPlanosToDelete(selectedPlanos.length.toString());
      setShowConfirmationModal(true);
    } else {
      toast.info("Seleccione al menos un plano");
    }
  }

  function handleDeleteCancel() {
    setDeleteEnable(false);
    setSelectedPlanos([]);
  }

  function handleDeleteStart() {
    setDeleteEnable(true);
  }

  return {
    handleAddPlano,
    handleConfirmDelete,
    handleDeleteCancel,
    handleDeleteStart,
  };
}
