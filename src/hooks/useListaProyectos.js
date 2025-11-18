import { toast } from "react-toastify";
import { proyectoService } from "../service/ProyectoService";
import { useContext, useEffect, useState } from "react";
import { ProyectoContext } from "../context/ProyectoContext";
import { useNavigate } from "react-router";

export default function useListaProyectos() {
  const { handleGetProyectos, setShowForm, setProyectoSeleccionadoEdit } =
    useContext(ProyectoContext);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  function handleAddProyecto() {
    setProyectoSeleccionadoEdit(null);
    setShowForm(true);
  }

  function handleEditProyecto(proyecto) {
    setProyectoSeleccionadoEdit(proyecto);
    setShowForm(true);
  }

  async function handleDeleteProyecto(id) {
    try {
      await proyectoService.deleteProyecto(id);
      toast.success("Proyecto eliminado exitosamente");
      // console.log("Proyecto eliminado exitosamente ");
      handleGetProyectos();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al eliminar proyecto");
      console.log("Error al eliminar proyecto");
    }
  }

  function handleNavigateProyecto(id) {
    navigate(`/proyectos/${id}`);
  }

  function handleGlobalMouseUp() {
    setFilaSeleccionada(null);
  }

  return {
    handleAddProyecto,
    handleEditProyecto,
    handleDeleteProyecto,
    filaSeleccionada,
    setFilaSeleccionada,
    handleNavigateProyecto,
  };
}
