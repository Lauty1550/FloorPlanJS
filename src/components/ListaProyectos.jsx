import "../css/ProyectoTable.css";
import "../css/Modal.css";
import "../css/BotonAgregarProyecto.css";
import "../css/BotonAccion.css";
import "../css/ProyectoPage.css";
import "../css/TitlePage.css";
import ButtonAdd from "../components/ButtonAdd";
import WorkersIcon from "../img/WorkersIcon";
import BlueprinIcon from "../img/BlueprintIcon";
import EditIconButton from "../img/EditIcon";
import DeleteIconButton from "../img/DeleteIcon";
import ModalDelete from "../components/ModalDelete";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { ProyectoContext } from "../context/ProyectoContext";
import useListaProyectos from "../hooks/useListaProyectos";

export default function ListaProyectos() {
  const navigate = useNavigate();
  const [proyectoDelete, setProyectoDelete] = useState();
  const { proyectos, errorFetch } = useContext(ProyectoContext);
  const { handleAddProyecto, handleDeleteProyecto, handleEditProyecto } =
    useListaProyectos();

  return (
    <>
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

          <div className="table-responsive padding-mobile">
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
                            navigate(`/proyecto/${proyecto.id}/responsables`, {
                              state: {
                                proyectoNombre: proyecto.nombreProyecto,
                              },
                            })
                          }
                        >
                          <WorkersIcon color="brown" />
                        </button>
                        <button
                          role="button"
                          className="boton-accion boton-principal"
                          onClick={() => navigate(`/proyectos/${proyecto.id}`)}
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

          <ModalDelete
            show={proyectoDelete}
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
    </>
  );
}
