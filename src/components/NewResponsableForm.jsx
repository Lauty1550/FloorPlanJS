import { useForm } from "react-hook-form";
import { responsableService } from "../service/ResponsableService";
import { toast } from "react-toastify";
import ButtonAdd from "./ButtonAdd";

export default function NewResponsableForm({ proyectoId, onClose, role }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let titulo = role.toString();

  if (titulo === "Proyectistas") {
    titulo = "Proyectista";
  }

  async function onSubmit(data) {
    data.dni = Number(data.dni); // Convertimos el valor de dni a número

    if (role === "Propietario") {
      try {
        await responsableService.crearPropietario(data, proyectoId);
        toast.success("Propietario creado");
        onClose();
      } catch (error) {
        console.error("Error al crear propietario ", error);
        toast.error("Error al crear propietario");
      }
    }

    if (role === "Proyectistas") {
      try {
        await responsableService.crearProyectista(data, proyectoId);
        toast.success("Proyectista creado");
        onClose();
      } catch (error) {
        console.error("Error al crear proyectista ", error);
        toast.error("Error al crear proyectista");
      }
    }

    if (role === "Dirección Técnica") {
      try {
        await responsableService.crearDireccionTecnica(data, proyectoId);
        toast.success("Direcion tecnica creada");

        onClose();
      } catch (error) {
        console.error("Error al crear direccion tecnica ", error);
        toast.error("Error al crear direccion tecnica");
      }
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
            <h5 className="modal-title">Crear {titulo}</h5>
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
                <label htmlFor="nombreCompleto" className="form-label">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombreCompleto"
                  className="form-control"
                  {...register("nombreCompleto", {
                    required: "El nombre es requerido",
                    maxLength: {
                      value: 40,
                      message: "El nombre debe tener menos de 40 caracteres",
                    },
                  })}
                />
                {errors.nombreCompleto && (
                  <p className="text-error"> {errors.nombreCompleto.message}</p>
                )}
              </div>

              {(role === "Dirección Técnica" || role === "Proyectistas") && (
                <>
                  <div className="mb-3">
                    <label htmlFor="matriculaProvincial" className="form-label">
                      Matrícula Provincial (opcional)
                    </label>
                    <input
                      type="text"
                      id="matriculaProvincial"
                      className="form-control"
                      {...register("matriculaProvincial", {
                        maxLength: {
                          value: 20,
                          message:
                            "La matrícula provincial debe tener menos de 20 caracteres",
                        },
                      })}
                    />
                    {errors.matriculaProvincial && (
                      <p className="text-error">
                        {errors.matriculaProvincial.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="matriculaMunicipal" className="form-label">
                      Matrícula Municipal (opcional)
                    </label>
                    <input
                      type="text"
                      id="matriculaMunicipal"
                      className="form-control"
                      {...register("matriculaMunicipal", {
                        maxLength: {
                          value: 20,
                          message:
                            "La matrícula municipal debe tener menos de 20 caracteres",
                        },
                      })}
                    />
                    {errors.matriculaMunicipal && (
                      <p className="text-error">
                        {errors.matriculaMunicipal.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="mb-3">
                <label htmlFor="dni" className="form-label">
                  DNI (opcional)
                </label>
                <input
                  type="number"
                  id="dni"
                  className="form-control"
                  {...register("dni", {
                    minLength: {
                      value: 8,
                      message: "El DNI debe tener al menos 8 dígitos",
                    },
                  })}
                />
                {errors.dni && (
                  <p className="text-error">{errors.dni.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="domicilio" className="form-label">
                  Domicilio (opcional)
                </label>
                <input
                  type="text"
                  id="domicilio"
                  className="form-control"
                  {...register("domicilio", {
                    maxLength: {
                      value: 100,
                      message:
                        "El domicilio debe tener menos de 100 caracteres",
                    },
                  })}
                />
                {errors.domicilio && (
                  <p className="text-error">{errors.domicilio.message}</p>
                )}
              </div>

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
