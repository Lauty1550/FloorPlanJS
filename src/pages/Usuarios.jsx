import { useEffect, useState } from "react";
import SpinLoader from "../components/Loader";
import Toast from "../components/Toast";
import ListaUsuarios from "../components/ListaUsuarios";

export default function Usuarios() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="text-center">
      <Toast />
      {isLoading && <SpinLoader isLoading={true} />}
      <section
        className={`table-container ${isLoading ? "invisible" : "visible"}`}
      >
        <h1 className="titulo-page mt-5">Usuarios</h1>
        <ListaUsuarios />
      </section>
    </main>
  );
}
