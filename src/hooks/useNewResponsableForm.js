import { useForm } from "react-hook-form";
import { responsableService } from "../service/ResponsableService";
import { toast } from "react-toastify";

export default function useNewResponsableForm({ role, proyectoId, onClose }) {
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

  return { titulo, register, handleSubmit, errors, onSubmit };
}
