const BASE_URL = import.meta.env.VITE_BASE_URL + "Etiqueta";

export const etiquetaService = {
  async addEtiquetaToPlano(data: any, planoId: string) {
    try {
      const response = await fetch(`${BASE_URL}/Agregar-Etiqueta/${planoId}`, {
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
      console.error("Error al crear etiqueta: ", error);
      throw error;
    }
  },

  async deleteEtiquetaById(id: string) {
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
      console.error("Error al eliminar etiqueta: ", error);
      throw error;
    }
  },
};
