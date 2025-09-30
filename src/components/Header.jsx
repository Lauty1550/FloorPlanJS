import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useContext } from "react";
import { DemoAuthContext } from "../context/DemoAuthContext";

export default function Header() {
  const { isAuthenticated, isLoading } = useContext(DemoAuthContext);

  console.log(isAuthenticated);

  return (
    <nav className="navbar bg-dark navbar-expand-lg  mb-5" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img
            src="/logo.jpg"
            alt="Proyecto"
            style={{ width: "90px", height: "80px" }}
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
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
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

            {/* User dropdown
            {isLoading ? (
              <button className="btn btn-secondary bg-dark">Cargando...</button>
            ) : isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary bg-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User Options
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            ) : (
              <LoginButton />
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}
