import ButtonAdd from "./ButtonAdd";
import useNewPlano from "../hooks/useNewPlano";

export default function NewPlano({ proyectoId, file, onUpdate }) {
  const { errors, handleSubmit, onSubmit, register, handleCloseForm } =
    useNewPlano({
      file,
      onUpdate,
      proyectoId,
    });

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
              onClick={handleCloseForm}
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
                <ButtonAdd onClick={() => {}} text={"Agregar"} type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
