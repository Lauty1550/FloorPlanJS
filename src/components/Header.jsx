import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import { useContext, useEffect, useState } from "react";
import { organizacionService } from "../service/OrganizacionService";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(DemoAuthContext);
  const [isLoading, setIsloading] = useState(true);
  const [organizaciones, setOrganizaciones] = useState();

  async function handleGetOrg() {
    return await organizacionService.obtenerOrganizaciones();
  }

  function handleSelectOrg(orgId, orgName) {
    setUser({ ...user, organizacionId: orgId, organizacionName: orgName });

    localStorage.setItem("organizacionId", orgId);
    localStorage.setItem("organizacionName", orgName);

    navigate("/proyectos");
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const organizacionesAux = await handleGetOrg();
        setOrganizaciones(organizacionesAux);
        setIsloading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.error("Error al obtener organizaciones");
      }
    };

    fetch();
  }, []);

  return (
    <nav
      className="header navbar bg-dark navbar-expand-lg  mb-5"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img
            src="/logo.jpg"
            alt="Proyecto"
            style={{ width: "80px", height: "70px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas menu */}
        <div
          className="offcanvas offcanvas-end drawer"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header ">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/proyectos">
                  Proyectos
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Floorplan
                </Link>
              </li>
            </ul>

            <div className="dropdown">
              <button
                className="boton-drop btn btn-secondary bg-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.organizacionName}
              </button>
              <ul className="boton-menu dropdown-menu">
                {isLoading ? (
                  <li>Cargando..</li>
                ) : (
                  organizaciones.map((organizacion) => (
                    <li
                      key={organizacion.id}
                      onClick={() =>
                        handleSelectOrg(organizacion.id, organizacion.nombre)
                      }
                    >
                      {organizacion.nombre}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
