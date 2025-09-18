import { useEffect, useState } from "react";
import { responsableService } from "../service/ResponsableService";
import { toast } from "react-toastify";

export default function useProjectWorkersModal({ role, proyectoId }) {
  const [responsables, setResponsables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [workerDelete, setWorkerDelete] = useState(null);
  const [errorFetch, setErrorFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setErrorFetch(false);
    if (role === "Propietario") {
      handleGetPropietario();
    } else {
      if (role === "Proyectistas") {
        handleGetProyectistas();
      } else {
        if (role === "Dirección Técnica") {
          handleGetDireccionTecnica();
        }
      }
    }
  }, [role, proyectoId, update]);

  async function handleGetPropietario() {
    setIsLoading(true);
    try {
      const data = await responsableService.getPropietarioByProjectoId(
        proyectoId
      );
      setResponsables(data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al obtener propietario");
      setErrorFetch(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetProyectistas() {
    setIsLoading(true);
    try {
      const data = await responsableService.getProyectistasByProjectoId(
        proyectoId
      );
      setResponsables(data ?? []);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al obtener proyectistas");
      setErrorFetch(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetDireccionTecnica() {
    setIsLoading(true);
    try {
      const data = await responsableService.getDireccionTecnicaByProjectoId(
        proyectoId
      );
      setResponsables(data ?? []);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al obtener Direccion Tecnica");
      setErrorFetch(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setUpdate(!update);
  }

  async function handleDelete() {
    if (!workerDelete) {
      return;
    }
    if (role === "Propietario") {
      await responsableService.deletePropietario(workerDelete._id);
    } else {
      if (role === "Proyectistas") {
        await responsableService.deleteProyectista(workerDelete._id);
      } else {
        if (role === "Dirección Técnica") {
          await responsableService.deleteDireccionTecnica(workerDelete._id);
        }
      }
    }
    toast.success("Eliminado con exito");
    setUpdate(!update);
  }

  return {
    responsables,
    isLoading,
    workerDelete,
    setWorkerDelete,
    errorFetch,
    showModal,
    handleShowModal,
    handleCloseModal,
    handleDelete,
  };
}
