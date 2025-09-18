import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { organizacionService } from "../service/OrganizacionService";
import { proyectoService } from "../service/ProyectoService";
import Toast from "../components/Toast";
import SpinLoader from "../components/Loader";
import ModalDelete from "../components/ModalDelete";
import NewOrganizacion from "../components/NewOrganizacion";
import ModalAddUserOrg from "../components/ModalAddUserOrg";
import ListaOrganizaciones from "../components/ListaOrganizaciones";
import { OrganizacionContext } from "../context/OrganizacionContext";
import useOrganizaciones from "../hooks/useOrganizaciones";

export default function Organizaciones() {
  const {
    organizaciones,
    organizacionSeleccionadaEdit,
    setOrganizacionSeleccionadaEdit,
    handleGetOrganizaciones,
    showForm,
    setShowForm,
    isLoading,
    errorFetch,
  } = useContext(OrganizacionContext);

  useOrganizaciones();

  const [organizacionDelete, setOrganizacionDelete] = useState(null);
  const [showModalAddUserOrg, setShowModalAddUserOrg] = useState(false);

  async function handleDeleteOrganizacion(id) {
    try {
      const proyectos = await proyectoService.obtenerProyectoPorOrganizacionId(
        id
      );
      for (const proyecto of proyectos) {
        await proyectoService.deleteProyecto(proyecto.id);
      }
      await organizacionService.deleteOrganizacion(id);
      toast.success("Organizacion eliminada");
      console.log("Organizacion eliminada");
      handleGetOrganizaciones();
    } catch (error) {
      toast.error("Error al eliminar organizacion");
      console.log("Error al eliminar organizacion", error);
    }
  }

  function handleCloseForm() {
    setShowForm(false);
    setOrganizacionSeleccionadaEdit(null);
  }

  function handleAddOrganizacion() {
    setOrganizacionSeleccionadaEdit(null);
    setShowForm(true);
  }

  function handleEditOrganizacion(organizacion) {
    setOrganizacionSeleccionadaEdit(organizacion);
    setShowForm(true);
  }
  return (
    <>
      <Toast />
      <SpinLoader isLoading={isLoading} />
      <main
        className={`table-container ${isLoading ? "invisible" : "visible"}`}
      >
        {showForm && (
          <NewOrganizacion
            organizacion={organizacionSeleccionadaEdit}
            onClose={handleCloseForm}
            onUpdate={handleGetOrganizaciones}
          />
        )}

        <ListaOrganizaciones
          errorFetch={errorFetch}
          handleAddOrganizacion={handleAddOrganizacion}
          handleEditOrganizacion={handleEditOrganizacion}
          organizaciones={organizaciones}
          setOrganizacionDelete={setOrganizacionDelete}
          setOrganizacionSeleccionadaEdit={setOrganizacionSeleccionadaEdit}
          setShowModalAddUserOrg={setShowModalAddUserOrg}
        />

        {/* Modal para confirmar eliminación */}
        <ModalDelete
          show={!!organizacionDelete}
          onClose={() => setOrganizacionDelete(null)}
          onDelete={() => {
            if (organizacionDelete) {
              handleDeleteOrganizacion(organizacionDelete.id);
            }
          }}
          leyenda="la organización"
          schemaName={organizacionDelete?.nombre || ""}
        />

        <ModalAddUserOrg
          show={showModalAddUserOrg}
          onClose={() => setShowModalAddUserOrg(false)}
          organizacionId={organizacionSeleccionadaEdit?.id ?? "Error"}
          organizacionName={organizacionSeleccionadaEdit?.nombre ?? ""}
        />
      </main>
    </>
  );
}
