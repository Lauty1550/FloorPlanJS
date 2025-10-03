import { toast } from "react-toastify";
import { proyectoService } from "../service/ProyectoService";
import { useContext } from "react";
import { ProyectoContext } from "../context/ProyectoContext";

export default function useListaProyectos() {
  const { handleGetProyectos, setShowForm, setProyectoSeleccionadoEdit } =
    useContext(ProyectoContext);

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

  return { handleAddProyecto, handleEditProyecto, handleDeleteProyecto };
}
