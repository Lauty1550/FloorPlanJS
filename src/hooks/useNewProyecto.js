import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { ProyectoContext } from "../context/ProyectoContext";
import { toast } from "react-toastify";
import { proyectoService } from "../service/ProyectoService";

export default function useNewProyecto({ reset }) {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const {
    usuario,
    proyectoSeleccionadoEdit,
    setProyectoSeleccionadoEdit,
    setShowForm,
    handleGetProyectos,
  } = useContext(ProyectoContext);
  const organizacionId = usuario?.organizacionId || "";

  useEffect(() => {
    if (proyectoSeleccionadoEdit) {
      reset(proyectoSeleccionadoEdit); // Carga los datos del proyecto seleccionado en el formulario
    }
  }, [proyectoSeleccionadoEdit, reset]);

  function handleCloseForm() {
    setShowForm(false);
    setProyectoSeleccionadoEdit(null);
  }

  const onSubmit = async (data) => {
    if (!isAuthenticated || isLoading || !user) {
      toast.error("No se pudo obtener la información del usuario");
      handleCloseForm();
      return;
    }

    try {
      const projectData = {
        ...data,
        userId: user.sub,
        organizacionId: organizacionId,
      };

      delete projectData.planos;

      if (proyectoSeleccionadoEdit) {
        await proyectoService.actualizarProyecto(
          proyectoSeleccionadoEdit.id,
          projectData
        );
        toast.success("Proyecto actualizado exitosamente");
      } else {
        await proyectoService.crearProyecto(projectData);
        toast.success("Proyecto creado exitosamente");
      }
      handleGetProyectos();
      handleCloseForm();
    } catch (error) {
      toast.error("Ocurrio un error");
      console.log("Ocurrio un error", error);
    }
  };

  return { handleCloseForm, onSubmit };
}
