import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";
import { useContext } from "react";
import { PlanoContext } from "../context/PlanoContext";

export default function useNewPlano({ file, proyectoId, onUpdate }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, user, isLoading } = useAuth0();

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
      //Subo el archivo y lo borro del planoData para que no tire error
      if (data.archivoUrl && data.archivoUrl[0]) {
        let file = data.archivoUrl[0];
        //Validacion del tipo de archivo
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
          console.log(data);
          throw new Error("Error: No se recibió un id del archivo.");
        }
      }

      await planoService.addPlanoToProyecto(planoData, proyectoId);

      handleCloseForm();
      onUpdate();
      toast.success("Plano agregado");
      console.log("Plano agregado");
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Error ", error);
    }
  }

  async function submitFile(data) {
    try {
      const planoData = { ...data };
      planoData.tipoArchivo = "image";
      const archivo = await fileService.subirArchivo(file);

      if (archivo && archivo.fileId) {
        setValue("archivoUrl", null);
        planoData.archivoUrl = archivo.fileId;
      } else {
        console.log(data);
        throw new Error("Error: No se recibió un id del archivo.");
      }

      await planoService.addPlanoToProyecto(planoData, proyectoId);

      handleCloseForm();
      onUpdate();
      toast.success("Plano agregado");
      console.log("Plano agregado");
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Error al crear plano ", error);
    }
  }

  return { register, errors, handleSubmit, onSubmit, handleCloseForm };
}
