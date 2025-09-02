import Toast from "../components/Toast";
import SpinLoader from "../components/Loader";
import ListaProyectos from "../components/ListaProyectos";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TableAnimation.css";
import "../css/TitlePage.css";
import NewProyecto from "../components/NewProyecto";
import { useContext } from "react";
import { ProyectoContext } from "../context/ProyectoContext";
import useProyectos from "../hooks/useProyectos";

export default function ProyectoPage() {
  const { isLoading, usuario, showProyectos, showForm } =
    useContext(ProyectoContext);

  useProyectos();

  if (!isLoading && usuario?.organizacionName === "Sin organizacion") {
    return (
      <div className="no-organization">
        <h1>No perteneces a ninguna organización</h1>
        <p>Por favor, contacta al administrador para más información.</p>
      </div>
    );
  }

  return (
    <>
      <Toast />
      <SpinLoader isLoading={isLoading} />
      <main
        className={`table-container ${isLoading ? "invisible" : "visible"}`}
      >
        <h1 className="titulo-page mt-5 text-center">
          Proyectos de la organización{" "}
          <span className="titulo-azul">{usuario?.organizacionName}</span>
        </h1>

        {showForm && <NewProyecto />}

        {showProyectos && <ListaProyectos />}
      </main>
    </>
  );
}
