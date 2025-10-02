import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { DemoAuthContext } from "../context/DemoAuthContext";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";
import ButtonAdd from "./ButtonAdd";
import SpinLoader from "./Loader";

export default function PlanoForm({
  proyectoId,
  onClose,
  onUpdate,
  file,
  clear,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, user, isLoading } = useContext(DemoAuthContext);
  const [pdfConversion, setPdfConversion] = useState(false);

  const onSubmit = async (data) => {
    if (!isAuthenticated || isLoading || !user) {
      toast.error("Error al obtener informacion del usuario");
      onClose();
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

      onClose();
      onUpdate();
      toast.success("Plano agregado");
      console.log("Plano agregado");
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Error ", error);
    } finally {
      setPdfConversion(false);
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

      clear();
      onClose();
      onUpdate();
      toast.success("Plano agregado");
      console.log("Plano agregado");
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Error al crear plano ", error);
    }
  }
  return (
    <main
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"> Agregar nuevo Plano</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="especialidad" className="form-label">
                  Especialidad
                </label>
                <input
                  type="text"
                  id="especialidad"
                  className="form-control"
                  {...register("especialidad", {
                    required: "El campo especialidad es requerido",
                    maxLength: {
                      value: 25,
                      message:
                        "El campo especialidad debe tener menos de 25 caracteres",
                    },
                  })}
                />

                {errors.especialidad && (
                  <p className="text-error">{errors.especialidad.message}</p>
                )}
              </div>

              {file === null && (
                <div className="mb-3">
                  <label htmlFor="archivoUrl" className="form-label">
                    Archivo (JPEG/PNG)
                  </label>
                  <input
                    type="file"
                    id="archivoUrl"
                    className="form-control"
                    {...register("archivoUrl", {
                      required: true,
                    })}
                  />
                  {errors.archivoUrl?.type === "required" && (
                    <p className="text-error"> Archivo requerido</p>
                  )}
                </div>
              )}

              <div className="text-center mt-3">
                {pdfConversion ? (
                  <SpinLoader isLoading={pdfConversion} />
                ) : (
                  <ButtonAdd
                    onClick={() => {}}
                    text={"Agregar"}
                    type="submit"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
