import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { proyectoService } from "../service/ProyectoService";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";
import { PlanoContext } from "../context/PlanoContext";

export default function useProyectoDetail() {
  const { id } = useParams();

  const {
    setPlanos,
    setIsloading,
    setDeleteEnable,
    setProyecto,
    selectedPlanos,
    setSelectedPlanos,
  } = useContext(PlanoContext);

  useEffect(() => {
    handleGetProyecto(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    deletePlanos,
    handleGetProyecto,
    id,
  };
}
