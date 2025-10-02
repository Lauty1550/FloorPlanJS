import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { etiquetaService } from "../service/EtiquetaService";
import { fileService } from "../service/FileService";
import ButtonAdd from "./ButtonAdd";
import NewPlano from "./NewPlano";
import PlanoForm from "./PlanoForm";

export default function NewEtiqueta({
  planoId,
  file,
  onClose,
  clear,
  proyectoId,
  onUpdate,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);

  const saveCroppedImage = async (data) => {
    try {
      // Subir archivo al servidor
      const archivo = await fileService.subirArchivo(file);

      if (archivo && archivo.fileId) {
        const etiquetaData = {
          archivoUrl: archivo.fileId,
          nombre: data.nombre,
        };

        // Asociar etiqueta con el plano
        await etiquetaService.addEtiquetaToPlano(etiquetaData, planoId);

        toast.success("Etiqueta creada");
        clear();
        reset();
        onUpdate();
        onClose();
      } else {
        throw new Error("No se recibió un id del archivo.");
      }
    } catch (error) {
      toast.error("Error al crear etiqueta.");
      console.error("Error al subir imagen: ", error);
    }
  };

  const onSubmit = async (data) => {
    await saveCroppedImage(data);
  };

  function HandleShowForm() {
    setShowForm(true);
  }
  return (
    <main
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      {showForm && (
        <PlanoForm
          clear={clear}
          onClose={onClose}
          onUpdate={() => {}}
          proyectoId={proyectoId}
          file={file}
        />
      )}

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear etiqueta</h5>
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
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  {...register("nombre", {
                    required: "El nombre es requerido",
                    maxLength: {
                      value: 25,
                      message: "El nombre debe tener menos de 25 caracteres",
                    },
                  })}
                />
                {errors.nombre && (
                  <p className="text-error">{errors.nombre.message}</p>
                )}
              </div>

              <ButtonAdd
                onClick={() => {}}
                text="Agregar Etiqueta"
                type="submit"
              />
              <ButtonAdd
                onClick={HandleShowForm}
                text="Crear plano"
                type="button"
                className="blue"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
