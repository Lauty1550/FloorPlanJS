import { useContext, useState } from "react";
import { OrganizacionContext } from "../context/OrganizacionContext";
import { userService } from "../service/UserService";
import { toast } from "react-toastify";

export default function useModalUserOrg({ organizacionId }) {
  const [isAdding, setIsAdding] = useState(null);
  const { updateUsers, setUpdateUsers } = useContext(OrganizacionContext);

  async function handleAddUser(userId) {
    setIsAdding(userId);
    try {
      await userService.addUserToOrg(organizacionId, userId);
      // console.log("Usuario agregado a la organizacion");
      toast.success("Usuario agregado");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al agregar usuario");
      console.error("Error al agregar usuario");
    } finally {
      setIsAdding(null);
      setUpdateUsers(!updateUsers);
    }
  }

  async function handleDeleteUserFromOrg(userId) {
    setIsAdding(userId);
    try {
      await userService.removeUserFromOrg(userId);
      // console.log("Usuario desvinculado");
      toast.success("Usuario desvinculado");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al desvincular usuario");
      console.error("Error al desvincular usuario ");
    } finally {
      setIsAdding(null);
      setUpdateUsers(!updateUsers);
    }
  }

  function handleLockUser(organizacionName) {
    toast.info(
      `Este usuario pertenece a la organizacion "${organizacionName}"`
    );
  }

  return { isAdding, handleAddUser, handleDeleteUserFromOrg, handleLockUser };
}
