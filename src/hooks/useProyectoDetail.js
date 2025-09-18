import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { proyectoService } from "../service/ProyectoService";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";

export default function useProyectoDetail() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState();
  const [planos, setPlanos] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [selectedPlanos, setSelectedPlanos] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [cantPlanosToDelete, setCantPlanosToDelete] = useState("");

  useEffect(() => {
    handleGetProyecto(id);
  }, []);

  async function handleGetProyecto(id) {
    setIsloading(true);
    try {
      const data = await proyectoService.obtenerProyecto(id);
      setProyecto(data);
      const planosTemp = data.planos;
      for (const plano of planosTemp) {
        await handleGetFile(plano);
      }
      setPlanos(planosTemp);

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error("Error al obtener proyecto: ");
      toast.error("Error al obtener proyecto");
    } finally {
      setIsloading(false);
    }
  }

  async function handleAddPlano() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }
  async function handleGetFile(plano) {
    try {
      const url = await fileService.obtenerArchivo(plano.archivoUrl);
      plano.preview = url;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar el archivo");
      console.error("Error al cargar archivo:");
    }
  }

  function handleDeleteStart() {
    setDeleteEnable(true);
  }

  function selectPlanoToDelete(id) {
    setSelectedPlanos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((planoId) => planoId !== id)
        : [...prevSelected, id]
    );
  }

  function handleDeleteCancel() {
    setDeleteEnable(false);
    setSelectedPlanos([]);
  }

  function handleConfirmDelete() {
    if (selectedPlanos.length > 0) {
      setCantPlanosToDelete(selectedPlanos.length.toString());
      setShowConfirmationModal(true);
    } else {
      toast.info("Seleccione al menos un plano");
    }
  }

  async function deletePlanos() {
    try {
      for (const plano of selectedPlanos) {
        await planoService.deletePlanoById(plano);
      }
      setDeleteEnable(false);
      setSelectedPlanos([]);
      handleGetProyecto(id);
      toast.success("Plano(s) eliminado(s)");
    } catch (error) {
      console.error("Error al eliminar plano(s): ", error);
      throw error;
    }
  }

  return {
    proyecto,
    planos,
    isLoading,
    showForm,
    deleteEnable,
    showConfirmationModal,
    cantPlanosToDelete,
    handleAddPlano,
    handleCloseForm,
    handleConfirmDelete,
    handleDeleteStart,
    selectPlanoToDelete,
    handleDeleteCancel,
    deletePlanos,
    handleGetProyecto,
    id,
    selectedPlanos,
    setShowConfirmationModal,
  };
}
