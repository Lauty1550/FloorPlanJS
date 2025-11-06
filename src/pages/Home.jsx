import "../css/Card.css";
import "../css/Titulo.css";
import "../css/CustomContainerHome.css";
import "../css/TitlePage.css";

import SpinLoader from "../components/Loader";
import { isAdmin } from "../functions/isAdmin";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DemoAuthContext } from "../context/DemoAuthContext";
import { FiFolder, FiHome, FiUser, FiUsers } from "react-icons/fi";
// import { userService } from "../service/UserService";

export default function Home() {
  const { isAuthenticated, isLoading, user, loginWithRedirect } =
    useContext(DemoAuthContext);

  // const addUser = async () => {
  //   try {
  //     const userData = {
  //       id: user?.sub,
  //       name: user?.name,
  //       email: user?.email,
  //       picture: user?.picture,
  //     };
  //     await userService.crearUser(userData);
  //   } catch (error) {
  //     console.log("Error al crear el usuario:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (isAuthenticated && !isLoading) {
  //     addUser();
  //   }
  // }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect({
        login_hint: "demo@demo.com",
      });
    }
  }, []);

  // console.log(import.meta.env);

  if (isLoading) {
    return <SpinLoader isLoading={isLoading} />;
  }

  return (
    <main className="container custom-container mt-3">
      <h1 className="titulo-page mb-5 mt-3">Inicio</h1>
      <div className="row ">
        <div className="col-md-6 mb-3">
          <Link to="/proyectos" className="card">
            <div className="card-body text-center">
              <FiFolder size={40} className="mb-3 text-primary" />
              <h5 className="card-title">Proyectos</h5>
              <p className="card-text">Administra tus proyectos</p>
            </div>
          </Link>
        </div>
        {isAdmin({ isAuthenticated, user }) && (
          <>
            <div className="col-md-6 mb-3">
              <Link to="/usuarios" className="card">
                <div className="card-body text-center">
                  <FiUsers size={40} className="mb-3 text-primary" />
                  <h5 className="card-title">Usuarios</h5>
                  <p className="card-text">
                    Administra los usuarios del sistema
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link to="/organizaciones" className="card">
                <div className="card-body text-center">
                  <FiHome size={40} className="mb-3 text-primary" />
                  <h5 className="card-title">Organizaciones</h5>
                  <p className="card-text">
                    Administra las diferentes organizaciones
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
