import useNewEtiqueta from "../hooks/useNewEtiqueta";
import ButtonAdd from "./ButtonAdd";
import PlanoForm from "./PlanoForm";

export default function NewEtiqueta({ onUpdate, planoId }) {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    handleCloseForm,
    proyectoId,
    cropperClear,
    showFormPlano,
    handleShowFormPlano,
  } = useNewEtiqueta({ onUpdate, planoId });

  return (
    <main
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      {showFormPlano && (
        <PlanoForm
          clear={cropperClear}
          onClose={handleCloseForm}
          onUpdate={() => {}}
          proyectoId={proyectoId}
        />
      )}

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear etiqueta</h5>
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
                onClick={handleShowFormPlano}
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
