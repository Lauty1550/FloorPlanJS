import { useContext, useEffect } from "react";
import { ProyectoContext } from "../context/ProyectoContext";
import { toast } from "react-toastify";
import { proyectoService } from "../service/ProyectoService";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function useNewProyecto({ reset }) {
  const { isAuthenticated, user, isLoading } = useContext(DemoAuthContext);
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
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Ocurrio un error");
      console.error("Ocurrio un error");
    }
  };

  return { handleCloseForm, onSubmit };
}
