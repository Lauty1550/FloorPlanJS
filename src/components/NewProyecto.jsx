import { useContext } from "react";
import { useForm } from "react-hook-form";
import ButtonAdd from "./ButtonAdd";
import { ProyectoContext } from "../context/ProyectoContext";
import useNewProyecto from "../hooks/useNewProyecto";
import { TipoObra } from "../const/TipoObra";
import { TipoDestino } from "../const/TipoDestino";

export default function NewProyecto() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { handleCloseForm, onSubmit } = useNewProyecto({ reset });
  const { proyectoSeleccionadoEdit } = useContext(ProyectoContext);

  return (
    <main
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            {proyectoSeleccionadoEdit ? (
              <h5 className="modal-title">Editar Proyecto</h5>
            ) : (
              <h5 className="modal-title">Agregar Nuevo Proyecto</h5>
            )}
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCloseForm}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nombreProyecto" className="form-label">
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  id="nombreProyecto"
                  className="form-control"
                  {...register("nombreProyecto", {
                    required: true,
                    maxLength: 20,
                  })}
                />

                {errors.nombreProyecto?.type === "required" && (
                  <p className="text-error">El campo de nombre es requerido</p>
                )}
                {errors.nombreProyecto?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de nombre debe tener menos de 20 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="ubicacion" className="form-label">
                  Direccion
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  className="form-control"
                  {...register("ubicacion", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.ubicacion?.type === "required" && (
                  <p className="text-error">
                    El campo de direccion es requerido
                  </p>
                )}
                {errors.ubicacion?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de direccion debe tener menos de 20 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="antecedente" className="form-label">
                  Antecedente
                </label>
                <input
                  type="text"
                  id="antecedente"
                  className="form-control"
                  {...register("antecedente", {
                    required: true,
                    maxLength: 200,
                  })}
                />
                {errors.antecedente?.type === "required" && (
                  <p className="text-error">
                    El campo de antecedente es requerido
                  </p>
                )}
                {errors.antecedente?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de antecedente debe tener menos de 200 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="escala" className="form-label">
                  Escala del proyecto
                </label>
                <input
                  type="text"
                  id="escala"
                  placeholder=" 1:100"
                  className="form-control"
                  {...register("escala", {
                    required: true,
                    maxLength: 5,
                  })}
                />

                {errors.escala?.type === "required" && (
                  <p className="text-error">El campo de escala es requerido</p>
                )}
                {errors.escala?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de escala debe tener menos de 5 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="tipoObra" className="form-label">
                  Tipo de Obra
                </label>
                <select
                  id="tipoObra"
                  className="form-control-select"
                  {...register("obra", { required: true })}
                >
                  <option value="">Seleccionar...</option>
                  {Object.entries(TipoObra).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.obra && (
                  <p className="text-error">
                    El campo de tipo de obra es requerido
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="destino" className="form-label">
                  Destino
                </label>
                <select
                  id="tipoDestino"
                  className="form-control-select"
                  {...register("destino", { required: true })}
                >
                  <option value="">Seleccionar...</option>
                  {Object.entries(TipoDestino).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.obra && (
                  <p className="text-error">El campo de destino es requerido</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="aprobacion" className="form-label">
                  Aprobado
                </label>
                <select
                  id="aprobacion"
                  className="form-control"
                  {...register("aprobacion", {
                    required: "El estado de aprobación es requerido",
                    validate: (value) =>
                      value === "Si" ||
                      value === "No" ||
                      "Solo puede ser 'Si' o 'No'",
                  })}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
                {errors.aprobacion && (
                  <p className="text-error">{errors.aprobacion.message}</p>
                )}
              </div>

              <div className="text-center mt-3">
                <ButtonAdd
                  onClick={() => {}}
                  text={proyectoSeleccionadoEdit ? "Editar" : "Agregar"}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
