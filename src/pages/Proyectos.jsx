import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Toast from "../components/Toast";
import SpinLoader from "../components/Loader";
import ButtonAdd from "../components/ButtonAdd";
import WorkersIcon from "../img/WorkersIcon";
import BlueprinIcon from "../img/BlueprintIcon";
import EditIconButton from "../img/EditIcon";
import DeleteIconButton from "../img/DeleteIcon";
import ModalDelete from "../components/ModalDelete";
import { userService } from "../service/UserService";
import { proyectoService } from "../service/ProyectoService";

export default function ProyectoPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [usuario, setUsuario] = useState();
  const [showProyectos, setShowProyectos] = useState(true);
  const [proyectoSeleccionadoEdit, setProyectoSeleccionadoEdit] = useState();
  const [proyectoDelete, setProyectoDelete] = useState();
  const [isLoading, setIsloading] = useState(true);
  const { isAuthenticated, user } = useAuth0();
  const [errorFetch, setErrorFetch] = useState(false);

  useEffect(() => {
    setErrorFetch(false);
    handleGetUser();
  }, []);

  useEffect(() => {
    if (usuario) {
      handleGetProyectos();
    }
  }, [usuario]);

  async function handleGetUser() {
    if (!isAuthenticated || !user || !user.sub) {
      console.log("No user");
      setIsloading(false);
      return;
    }
    try {
      const userOrg = await userService.obtenerPorAuth0Id(user.sub);
      if (userOrg) {
        setUsuario(userOrg);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      toast.error("Error al obtener proyectos");
      setErrorFetch(true);
      setIsloading(false);
    }
  }

  function handleAddProyecto() {
    setProyectoSeleccionadoEdit(null);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setProyectoSeleccionadoEdit(null);
  }

  async function handleGetProyectos() {
    setIsloading(true);
    if (!isAuthenticated || !user || !user.sub || !usuario) {
      toast.error("Error al obtener proyectos");
      setIsloading(false);
      return;
    }
    try {
      const data = await proyectoService.obtenerProyectoPorOrganizacionId(
        usuario.organizacionId
      );
      setProyectos(data);
      setShowProyectos(true);
      console.log("Proyectos obtenidos exitosamente");
    } catch (error) {
      toast.error("Error al obtener proyectos");
      console.log("Error al obtener proyectos", error);
      setErrorFetch(true);
    } finally {
      setIsloading(false);
    }
  }

  async function handleDeleteProyecto(id) {
    try {
      await proyectoService.deleteProyecto(id);
      toast.success("Proyecto eliminado exitosamente");
      console.log("Proyecto eliminado exitosamente ");
      handleGetProyectos();
    } catch (error) {
      toast.error("Error al eliminar proyecto");
      console.log("Error al eliminar proyecto", error);
    }
  }

  function handleEditProyecto(proyecto) {
    setProyectoSeleccionadoEdit(proyecto);
    setShowForm(true);
  }

  if (!isLoading && usuario?.organizacionName === "Sin organizacion") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          textAlign: "center",
        }}
      >
        <h1>No perteneces a ninguna organización</h1>
        <p>Por favor, contacta al administrador para más información.</p>
      </div>
    );
  }

  return (
    <>
      <Toast />
      <SpinLoader isLoading={isLoading} />
      <div className={`table-container ${isLoading ? "invisible" : "visible"}`}>
        <h1 className="titulo-page mt-5 text-center">
          Proyectos de la organización{" "}
          <span className="titulo-azul">{usuario?.organizacionName}</span>
        </h1>

        {showForm && (
          <NewProyecto
            proyecto={proyectoSeleccionadoEdit}
            onClose={handleCloseForm}
            onUpdate={handleGetProyectos}
            organizacionId={usuario?.organizacionId || ""}
          />
        )}

        <br />

        {/* Renderiza la lista de proyectos */}
        {showProyectos && (
          <main>
            {errorFetch ? (
              <div className="modal-body text-center">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ocurrio un error al cargar los datos.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                <ButtonAdd
                  onClick={handleAddProyecto}
                  text="Agregar Proyecto"
                  type="button"
                />

                <div className="table-responsive">
                  <table className="table table-striped mt-3">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Tipo de obra</th>
                        <th>Destino</th>
                        <th>Escala</th>
                        <th>Antecedente</th>
                        <th>Aprobado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectos.length === 0 ? (
                        // Mostrar mensaje cuando no hay proyectos
                        <tr>
                          <td colSpan={8} className="text-center">
                            No hay proyectos
                          </td>
                        </tr>
                      ) : (
                        // Mostrar proyectos si existen
                        proyectos.map((proyecto) => (
                          <tr key={proyecto.id}>
                            <td>{proyecto.nombreProyecto}</td>
                            <td>{proyecto.ubicacion}</td>
                            <td>{proyecto.obra}</td>
                            <td>{proyecto.destino}</td>
                            <td>{proyecto.escala}</td>
                            <td>{proyecto.antecedente}</td>
                            <td>{proyecto.aprobacion}</td>
                            <td>
                              <button
                                className="boton-accion boton-principal"
                                title="Responsables"
                                onClick={() =>
                                  navigate(
                                    `/proyecto/${proyecto.id}/responsables`,
                                    {
                                      state: {
                                        proyectoNombre: proyecto.nombreProyecto,
                                      },
                                    }
                                  )
                                }
                              >
                                <WorkersIcon color="brown" />
                              </button>
                              <button
                                role="button"
                                className="boton-accion boton-principal"
                                onClick={() =>
                                  navigate(`/proyectos/${proyecto.id}`)
                                }
                                title="Planos"
                                id="VerPlanos"
                              >
                                <BlueprinIcon />
                              </button>
                              <EditIconButton
                                onClick={() => handleEditProyecto(proyecto)}
                              />
                              <DeleteIconButton
                                onClick={() => setProyectoDelete(proyecto)}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Modal para confirmar eliminación */}
                <ModalDelete
                  show={!!proyectoDelete}
                  onClose={() => setProyectoDelete(null)}
                  onDelete={() => {
                    if (proyectoDelete) {
                      handleDeleteProyecto(proyectoDelete.id);
                    }
                  }}
                  leyenda="el proyecto"
                  schemaName={proyectoDelete?.nombreProyecto || ""}
                />
              </>
            )}
          </main>
        )}
      </div>
    </>
  );
}
