import { useState } from "react";
import { useLocation, useParams } from "react-router";

export default function useProyectoTrabajadores() {
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

  return {
    id,
    proyectoNombre,
    showModal,
    selectedRole,
    handleShowModalPropietario,
    handleShowModalDireccionTecnica,
    handleShowModalProyectista,
    handleCloseModal,
  };
}
