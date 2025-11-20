import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { organizacionService } from "../service/OrganizacionService";
import { toast } from "react-toastify";
import ButtonAdd from "./ButtonAdd";
import "../css/Modal.css";

export default function NewOrganizacion({ organizacion, onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: organizacion || {} });

  useEffect(() => {
    if (organizacion) {
      reset(organizacion); //Carga los datos de la org
    }
  }, [organizacion, reset]);

  const onSubmit = async (data) => {
    try {
      const organizacionData = { ...data };
      if (organizacion) {
        await organizacionService.actualizarOrganizacion(
          organizacion.id,
          organizacionData
        );
        toast.success("Organizacion actualizada");
      } else {
        await organizacionService.crearOrganizacion(organizacionData);
        toast.success("Organizacion creada exitosamente");
      }
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Ocurrio un error", error);
    }
  };
  return (
    <main
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            {organizacion ? (
              <h5 className="modal-title"> Editar Organizacion</h5>
            ) : (
              <h5 className="modal-title"> Agregar nueva Organizacion</h5>
            )}

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre de la organizacion
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  {...register("nombre", {
                    required: true,
                    maxLength: 25,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p className="text-error">El campo de nombre es requerido</p>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de nombre debe tener menos de 25 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Direccion
                </label>
                <input
                  type="text"
                  id="direccion"
                  className="form-control"
                  {...register("direccion", { required: true, maxLength: 25 })}
                />
                {errors.direccion?.type === "required" && (
                  <p className="text-error"> El campo direccion es requerido</p>
                )}
                {errors.direccion?.type === "maxLength" && (
                  <p className="text-error">
                    El campo direccion debe tener menos de 25 caracteres
                  </p>
                )}

                <div className="mb-3">
                  <label htmlFor="datosContacto" className="form-label">
                    Datos de contacto
                  </label>
                  <input
                    type="text"
                    id="datosContacto"
                    className="form-control"
                    {...register("datosContacto", {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                  {errors.datosContacto?.type === "required" && (
                    <p className="text-error">
                      {" "}
                      El campo datos de contacto es requerido
                    </p>
                  )}
                  {errors.datosContacto?.type === "maxLength" && (
                    <p className="text-error">
                      {" "}
                      El campo debe tener menos de 50 caracteres
                    </p>
                  )}

                  <h5 className="mt-3"> Forma</h5>

                  <div className="mb-3">
                    <label htmlFor="letra" className="form-label">
                      Letra
                    </label>
                    <input
                      type="text"
                      id="letra"
                      className="form-control"
                      {...register("letra", {
                        required: "El campo letra es requerido",
                        maxLength: {
                          value: 25,
                          message: "Debe contener menos de 25 caracteres",
                        },
                      })}
                    />
                    {errors.letra && (
                      <p className="text-error"> {errors.letra.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="numero" className="form-label">
                      N°
                    </label>
                    <input
                      type="number"
                      min="0"
                      id="numero"
                      className="form-control"
                      {...register("numero", {
                        required: "El numero es requerido",
                        valueAsNumber: true,
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Debe ser un número entero",
                      })}
                    />
                    {errors.numero && (
                      <p className="text-error"> {errors.numero.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="anio" className="form-label">
                      Año
                    </label>
                    <select
                      id="anio"
                      className="form-control"
                      {...register("anio", {
                        required: "Se requiere el año",
                      })}
                    >
                      <option value="">Seleccione un año</option>
                      {Array.from(
                        { length: 101 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.anio && (
                      <p className="text-error">{errors.anio.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="partida" className="form-label">
                      Partida
                    </label>
                    <input
                      type="text"
                      id="partida"
                      className="form-control"
                      {...register("partida", {
                        required: "Se requiere la partida",
                        maxLength: {
                          value: 50,
                          message:
                            "La partida debe contener menos de 50 caracteres",
                        },
                      })}
                    />
                    {errors.partida && (
                      <p className="text-error"> {errors.partida.message}</p>
                    )}
                  </div>

                  <div className="text-center mt-3">
                    <ButtonAdd
                      onClick={() => {}}
                      type="submit"
                      text={organizacion ? "Editar" : "Agregar"}
                      disabled={organizacion && !isDirty}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
