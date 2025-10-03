import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import { planoService } from "../service/PlanoService";
// import { fileService } from "../service/FileService";
import { etiquetaService } from "../service/EtiquetaService";

export default function usePlanoDetail() {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const location = useLocation();
  const proyectoNombre = location.state?.proyectoNombre;
  const {
    setPlanoRender,
    setArchivoUrl,
    isFullScreen,
    setEtiquetas,
    setDeleteEnable,
    selectedEtiquetas,
    setSelectedEtiquetas,
  } = useContext(PlanoDetailContext);

  useEffect(() => {
    if (id) {
      handleGetPlano(id);
    } else {
      toast.error("Error al obtener el ID del plano");
      setIsloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullScreen]);

  async function handleGetPlano(id) {
    setIsloading(true);
    try {
      const data = await planoService.getPlanoById(id);
      setPlanoRender(data);
      const etiquetasTemp = data.etiquetas;
      // for (const etiqueta of etiquetasTemp) {
      //   await handleGetFileEtiqueta(etiqueta);
      // }
      setEtiquetas(etiquetasTemp);
      console.log("Plano obtenido");
      setArchivoUrl(data.archivoUrl.url);
      setIsloading(false);

      // if (data.archivoUrl) {
      //   handleGetFile(data.archivoUrl);
      // }
    } catch (error) {
      setIsloading(false);
      toast.error("Error al obtener plano");
      console.error("Error al obtener plano:", error);
    }
  }

  // async function handleGetFile(archivoUrl) {
  //   setIsloading(true);
  //   try {
  //     const url = await fileService.obtenerArchivo(archivoUrl);
  //     setArchivoUrl(url);
  //   } catch (error) {
  //     toast.error("Error al cargar el archivo");
  //     console.error("Error al cargar archivo:", error);
  //   } finally {
  //     setIsloading(false);
  //   }
  // }

  // async function handleGetFileEtiqueta(etiqueta) {
  //   try {
  //     const url = await fileService.obtenerArchivo(etiqueta.archivoUrl);
  //     etiqueta.preview = url;
  //   } catch (error) {
  //     toast.error("Error al cargar el archivo etiqueta");
  //     console.error("Error al cargar archivo etiqueta:", error);
  //   }
  // }

  async function deleteEtiquetas() {
    try {
      for (const etiqueta of selectedEtiquetas) {
        await etiquetaService.deleteEtiquetaById(etiqueta);
      }
      setDeleteEnable(false);
      setSelectedEtiquetas([]);
      handleGetPlano(id);
      toast.success("Etiqueta(s) eliminada(s)");
    } catch (error) {
      console.error("Error al eliminar etiqueta(s): ", error);
      throw error;
    }
  }

  return {
    id,
    isLoading,
    proyectoNombre,
    handleGetPlano,
    deleteEtiquetas,
  };
}
