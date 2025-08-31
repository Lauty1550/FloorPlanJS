const BASE_URL = import.meta.env.VITE_BASE_URL + "Organizacion";

export const organizacionService = {
  async crearOrganizacion(data: any) {
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
      console.error("Error al crear organizacion: ", error);
      throw error;
    }
  },

  async obtenerOrganizaciones() {
    try {
      const response = await fetch(`${BASE_URL}/Get-All`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener organizaciones", error);
      throw error;
    }
  },

  async actualizarOrganizacion(id: string, data: any) {
    try {
      const responde = await fetch(`${BASE_URL}/Update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!responde.ok) {
        throw new Error("Error al actualiar la organizacion");
      }
      return await responde.json();
    } catch (error) {
      console.error("Error al actualizar organizacion: ", error);
      throw error;
    }
  },

  async deleteOrganizacion(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/Borrar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar organizacion", error);
      throw error;
    }
  },
};
