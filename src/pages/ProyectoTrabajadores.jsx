import "../css/Card.css";
import "../css/Titulo.css";
import "../css/CustomContainerHome.css";
import "../css/TitlePage.css";
import "../css/BackButton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useParams } from "react-router";
import { useState } from "react";
import BackArrowIcon from "../img/BackArrowSVG";
import ProjectWorkersModal from "../components/ProjectWorkersModal";

// /type RoleType = "Propietario" | "Proyectistas" | "Dirección Técnica";

export default function ProyectoTrabajadores() {
  const { id } = useParams();

  const location = useLocation();
  const proyectoNombre = location.state?.proyectoNombre;

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  function handleShowModalPropietario() {
    setSelectedRole("Propietario");
    setShowModal(true);
  }

  function handleShowModalProyectista() {
    setSelectedRole("Proyectistas");
    setShowModal(true);
  }

  function handleShowModalDireccionTecnica() {
    setSelectedRole("Dirección Técnica");
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  //   async function handleGetPropietario() {
  //     const data = await responsableService.getPropietarioByProjectoId(id);
  //     console.log(data);
  //     setResponsables(data);
  //   }

  //   async function handleGetProyectistas() {
  //     const data = await responsableService.getProyectistasByProjectoId(id);
  //     setResponsables(data);
  //   }

  //   async function handleGetDireccionTecnica() {
  //     const data = await responsableService.getDireccionTecnicaByProjectoId(id);
  //     setResponsables(data);
  //   }

  return (
    <main className="container custom-container mt-3">
      <h1 className="titulo-page mb-5 mt-3">
        {" "}
        Responsables del proyecto{" "}
        <span className="titulo-azul"> {proyectoNombre}</span>
      </h1>

      <Link to="/proyectos" className="back-button mb-3">
        <button className="back-button" title="Volver">
          <BackArrowIcon color="black" />
        </button>
      </Link>

      <div className="row mt-3">
        <div
          className="col-md-6 mb-3"
          onClick={handleShowModalPropietario}
          style={{ cursor: "pointer" }}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Propietario</h5>
              <p className="card-text"> Propietario del proyecto</p>
            </div>
          </div>
        </div>

        <div
          className="col-md-6 mb-3"
          onClick={handleShowModalProyectista}
          style={{ cursor: "pointer" }}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Proyectistas</h5>
              <p className="card-text">
                Profesionales que desarrollaron el diseño y calculos
              </p>
            </div>
          </div>
        </div>

        <div
          className="col-md-6 mb-3"
          onClick={handleShowModalDireccionTecnica}
          style={{ cursor: "pointer" }}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Direccion tecnica</h5>
              <p className="card-text">
                Profesionales a cargo de la construccion de la obra
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedRole && (
        <ProjectWorkersModal
          onClose={handleCloseModal}
          role={selectedRole}
          show={showModal}
          proyectoId={id}
        />
      )}
    </main>
  );
}
