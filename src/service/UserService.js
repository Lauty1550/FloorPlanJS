const BASE_URL = import.meta.env.VITE_BASE_URL + "User";

export const userService = {
  async crearUser(data) {
    try {
      const response = await fetch(`${BASE_URL}/Crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.log("Error al crear usuario", error);
      throw error;
    }
  },

  async obtenerUsuarios() {
    const resp = await fetch(`${BASE_URL}/Get-All`);
    const data = await resp.json();
    return data;
  },

  async obtenerPorAuth0Id(id) {
    const resp = await fetch(`${BASE_URL}/Auth0Id/${id}`);
    const data = await resp.json();
    return data;
  },

  async addUserToOrg(organizacionId, userId) {
    try {
      const response = await fetch(
        `${BASE_URL}/Agregar-User/${organizacionId}/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.log("Error al agregar usuario a la organizacion", error);
      throw error;
    }
  },

  async removeUserFromOrg(userId) {
    try {
      const response = await fetch(`${BASE_URL}/Remove-From-Org/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.log("Error al desvincular usuario", error);
      throw error;
    }
  },

  // async obtenerUsuarios() {
  //   try {
  //     const response = await fetch(`${BASE_URL}/Get-All`);

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error al obtener usuarios", error);
  //     throw error;
  //   }
  // },
};
