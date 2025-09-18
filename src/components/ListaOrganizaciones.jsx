import ButtonAdd from "./ButtonAdd";
import DeleteIconButton from "../img/DeleteIcon";
import AddUserIcon from "../img/AddUser";
import EditIconButton from "../img/EditIcon";

export default function ListaOrganizaciones({
  errorFetch,
  handleAddOrganizacion,
  organizaciones,
  setOrganizacionDelete,
  setOrganizacionSeleccionadaEdit,
  setShowModalAddUserOrg,
  handleEditOrganizacion,
}) {
  return (
    <fieldset className="mt-3 text-center">
      <h1 className="titulo-page text-center mb-5 mt-5">Organizaciones</h1>

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
            onClick={handleAddOrganizacion}
            text="Agregar Organizacion"
            type="button"
          />
          <div className="table-responsive">
            <table className="table table-striped mt-3 text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Direccion</th>
                  <th>Datos de contacto</th>
                  <th>Letra</th>
                  <th>Numero</th>
                  <th>Año</th>
                  <th>Partida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {organizaciones.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No hay organizaciones
                    </td>
                  </tr>
                ) : (
                  //Mostrar organizaciones
                  organizaciones.map((organizacion) => (
                    <tr key={organizacion.id}>
                      <td>{organizacion.nombre}</td>
                      <td>{organizacion.direccion}</td>
                      <td>{organizacion.datosContacto}</td>
                      <td>{organizacion.letra}</td>
                      <td>{organizacion.numero}</td>
                      <td>{organizacion.anio}</td>
                      <td>{organizacion.partida}</td>

                      <td>
                        <button
                          id="botonAgregarUserOrganizacion"
                          type="button"
                          title="Usuarios"
                          className="boton-accion boton-principal"
                          onClick={() => {
                            setOrganizacionSeleccionadaEdit(organizacion);
                            setShowModalAddUserOrg(true);
                          }}
                        >
                          <AddUserIcon />
                        </button>
                        <EditIconButton
                          onClick={() => handleEditOrganizacion(organizacion)}
                        />
                        <DeleteIconButton
                          onClick={() => setOrganizacionDelete(organizacion)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </fieldset>
  );
}
