import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";
import { useContext } from "react";
import { PlanoContext } from "../context/PlanoContext";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function useNewPlano({ file, proyectoId, onUpdate }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, user, isLoading } = useContext(DemoAuthContext);

  const { setShowForm } = useContext(PlanoContext);

  function handleCloseForm() {
    setShowForm(false);
  }

  const onSubmit = async (data) => {
    if (!isAuthenticated || isLoading || !user) {
      toast.error("Error al obtener informacion del usuario");
      handleCloseForm();
      return;
    }
    if (file === null) {
      submitNewFile(data);
    } else {
      submitFile(data);
    }
  };

  async function submitNewFile(data) {
    try {
      const planoData = { ...data };

      if (data.archivoUrl && data.archivoUrl[0]) {
        let file = data.archivoUrl[0];

        // Validación del tipo de archivo
        const tipoImagen = ["image/jpeg", "image/png"];
        if (!tipoImagen.includes(file.type)) {
          toast.error("El archivo debe ser una imagen (JPEG/PNG).");
          return;
        }

        planoData.tipoArchivo = "image";

        // Validación del tamaño
        if (file.size > 10 * 1024 * 1024) {
          toast.error("El tamaño del archivo no puede ser mayor a 10MB.");
          return;
        }

        // Subir el archivo a Cloudinary
        const archivo = await fileService.subirArchivo(file);

        if (archivo && archivo.fileUrl && archivo.publicId) {
          // Limpiar el campo del input
          setValue("archivoUrl", null);

          // Guardamos en planoData tanto el publicId como la URL
          delete planoData.archivoUrl;
          planoData.archivoUrl = {
            url: archivo.fileUrl,
            publicId: archivo.publicId,
          };
        } else {
          console.log(data);
          throw new Error("Error: No se recibió la información del archivo.");
        }
      }

      // Agregar plano al proyecto
      await planoService.addPlanoToProyecto(planoData, proyectoId);

      handleCloseForm();
      onUpdate();
      toast.success("Plano agregado");
      console.log("Plano agregado");
    } catch (error) {
      toast.error("Ocurrió un error");
      console.log("Error ", error);
    }
  }

  async function submitFile(data) {
    try {
      const planoData = { ...data };
      planoData.tipoArchivo = "image";

      // Si hay archivo seleccionado
      if (data.archivoUrl && data.archivoUrl[0]) {
        const file = data.archivoUrl[0];

        // Validación del tipo de archivo
        const tiposPermitidos = ["image/jpeg", "image/png"];
        if (!tiposPermitidos.includes(file.type)) {
          toast.error("El archivo debe ser una imagen (JPEG/PNG).");
          return;
        }

        // Validación del tamaño (máx 10 MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error("El tamaño del archivo no puede ser mayor a 10MB.");
          return;
        }

        // Subir archivo a Cloudinary
        const archivo = await fileService.subirArchivo(file);

        if (archivo && archivo.fileUrl && archivo.publicId) {
          // Limpiamos el campo del formulario
          setValue("archivoUrl", null);

          // Mandamos objeto con url y publicId
          planoData.archivoUrl = {
            url: archivo.fileUrl,
            publicId: archivo.publicId,
          };
        } else {
          throw new Error(
            "Error: No se recibió un archivo válido de Cloudinary."
          );
        }
      }

      // Enviar datos al backend
      await planoService.addPlanoToProyecto(planoData, proyectoId);

      handleCloseForm();
      onUpdate();
      toast.success("Plano agregado");
      console.log("Plano agregado");
    } catch (error) {
      toast.error("Ocurrió un error");
      console.log("Error al crear plano: ", error);
    }
  }

  return { register, errors, handleSubmit, onSubmit, handleCloseForm };
}
