import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { fileService } from "../service/FileService";
import { etiquetaService } from "../service/EtiquetaService";
import { toast } from "react-toastify";
import { PlanoDetailContext } from "../context/PlanoDetailContext";

export default function useNewEtiqueta({ onUpdate, planoId }) {
  const { planoRender, cropperRef, croppedFile, showForm, setShowForm } =
    useContext(PlanoDetailContext);
  const proyectoId = planoRender?.proyectoId;

  const [showFormPlano, setShowFormPlano] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const saveCroppedImage = async (data) => {
    try {
      const archivo = await fileService.subirArchivo(croppedFile);

      if (archivo && archivo.fileUrl) {
        const etiquetaData = {
          archivoUrl: { url: archivo.fileUrl, publicId: archivo.publicId },
          nombre: data.nombre,
        };

        // Asociar etiqueta con el plano
        await etiquetaService.addEtiquetaToPlano(etiquetaData, planoId);

        toast.success("Etiqueta creada");
        cropperClear();
        reset();
        onUpdate();
        handleCloseForm();
      } else {
        throw new Error("No se recibió la URL del archivo.");
      }
    } catch (error) {
      toast.error("Error al crear etiqueta.");
      console.error("Error al subir imagen: ", error);
    }
  };

  const onSubmit = async (data) => {
    await saveCroppedImage(data);
  };

  function handleShowForm() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  function handleShowFormPlano() {
    setShowFormPlano(true);
  }

  function cropperClear() {
    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      toast.error("No se pudo acceder al .");
      return;
    }

    cropper.clear();
  }

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    showForm,
    handleShowForm,
    handleCloseForm,
    proyectoId,
    cropperClear,
    handleShowFormPlano,
    showFormPlano,
  };
}
