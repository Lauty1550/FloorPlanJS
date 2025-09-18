import { useState } from "react";
import { PlanoContext } from "./PlanoContext";

export default function PlanoProvider({ children }) {
  const [planos, setPlanos] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [proyecto, setProyecto] = useState();
  const [selectedPlanos, setSelectedPlanos] = useState([]);
  const [cantPlanosToDelete, setCantPlanosToDelete] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <PlanoContext.Provider
      value={{
        planos,
        setPlanos,
        isLoading,
        setIsloading,
        deleteEnable,
        setDeleteEnable,
        proyecto,
        setProyecto,
        selectedPlanos,
        setSelectedPlanos,
        cantPlanosToDelete,
        setCantPlanosToDelete,
        showForm,
        setShowForm,
        showConfirmationModal,
        setShowConfirmationModal,
      }}
    >
      {children}
    </PlanoContext.Provider>
  );
}
