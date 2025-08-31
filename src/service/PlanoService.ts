const BASE_URL = import.meta.env.VITE_BASE_URL + "Plano";

export const planoService = {
  async addPlanoToProyecto(data: any, proyectoId: string) {
    try {
      const response = await fetch(`${BASE_URL}/Agregar-Plano/${proyectoId}`, {
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
      console.error("Error al crear plano: ", error);
      throw error;
    }
  },

  async getPlanoById(id: string) {
    try {
      const resp = await fetch(`${BASE_URL}/${id}`);
      if (!resp.ok) {
        throw new Error(
          `Error al obtener el plano: ${resp.status} ${resp.statusText}`
        );
      }

      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("Error al obtener plano:", error);
      throw error;
    }
  },

  async deletePlanoById(id: string) {
    try {
      const resp = await fetch(`${BASE_URL}/Borrar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.statusText}`);
      }

      return await resp.json();
    } catch (error) {
      console.error("Error al eliminar plano: ", error);
      throw error;
    }
  },
};
