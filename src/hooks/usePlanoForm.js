import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { DemoAuthContext } from "../context/DemoAuthContext";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";

export default function usePlanoForm({ onClose, onUpdate, proyectoId, clear }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, user, isLoading } = useContext(DemoAuthContext);
  const [pdfConversion, setPdfConversion] = useState(false);

  const { croppedFile } = useContext(PlanoDetailContext);

  const onSubmit = async (data) => {
    if (!isAuthenticated || isLoading || !user) {
      toast.error("Error al obtener informacion del usuario");
      onClose();
      return;
    }
    if (croppedFile === null) {
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
        const tipoImagen = ["image/jpeg", "image/png"];

        if (!tipoImagen.includes(file.type)) {
          toast.error("El archivo debe ser una imagen (JPEG/PNG).");
          return;
        }

        planoData.tipoArchivo = "image";

        //Validacion del tamanio
        if (file.size > 10 * 1024 * 1024) {
          // 2MB
          toast.error("El tamaño del archivo no puede ser mayor a 2MB.");
          return;
        }

        const archivo = await fileService.subirArchivo(file);

        if (archivo && archivo.fileId) {
          setValue("archivoUrl", null);
          delete planoData.archivoUrl;
          planoData.archivoUrl = archivo.fileId;
        } else {
          throw new Error("Error: No se recibió un id del archivo.");
        }
      }

      await planoService.addPlanoToProyecto(planoData, proyectoId);

      onClose();
      onUpdate();
      toast.success("Plano agregado");
      // console.log("Plano agregado");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Error ");
    } finally {
      setPdfConversion(false);
    }
  }

  async function submitFile(data) {
    try {
      const planoData = { ...data };
      planoData.tipoArchivo = "image";

      const archivo = await fileService.subirArchivo(croppedFile);

      if (archivo && archivo.fileUrl && archivo.publicId) {
        planoData.archivoUrl = {
          url: archivo.fileUrl,
          publicId: archivo.publicId,
        };
      } else {
        throw new Error(
          "Error: No se recibió la URL o el publicId del archivo."
        );
      }

      await planoService.addPlanoToProyecto(planoData, proyectoId);

      clear();
      onClose();
      onUpdate();
      toast.success("Plano agregado");
      // console.log("Plano agregado");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Ocurrió un error");
      console.log("Error al crear plano");
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    pdfConversion,
    onSubmit,
    croppedFile,
  };
}
