const BASE_URL = import.meta.env.VITE_BASE_URL;

export const responsableService = {
  async crearPropietario(data: any, proyectoId: string) {
    try {
      const response = await fetch(
        `${BASE_URL}Propietario/Agregar-Propietario/${proyectoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al crear propietario ", error);
      throw error;
    }
  },

  async getPropietarioByProjectoId(proyectoId: string) {
    try {
      const resp = await fetch(`${BASE_URL}Propietario/Get/${proyectoId}`);

      if (!resp.ok) {
        throw new Error(
          `Error en la petición: ${resp.status} ${resp.statusText}`
        );
      }

      const text = await resp.text();
      if (!text) {
        return null;
      }

      return JSON.parse(text);
    } catch (error) {
      console.error("Error al obtener el propietario:", error);
      throw error;
    }
  },

  async crearProyectista(data: any, proyectoId: string) {
    console.log("dfats ", data);
    try {
      const response = await fetch(
        `${BASE_URL}Proyectista/Agregar-Proyectista/${proyectoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al crear proyectista ", error);
      throw error;
    }
  },

  async getProyectistasByProjectoId(proyectoId: string) {
    const resp = await fetch(`${BASE_URL}Proyectista/Get/${proyectoId}`);
    const data = await resp.json();
    return data;
  },

  async crearDireccionTecnica(data: any, proyectoId: string) {
    try {
      const response = await fetch(
        `${BASE_URL}Direccion-tecnica/Agregar-DireccionTecnica/${proyectoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al crear Direccion tecnica ", error);
      throw error;
    }
  },

  async getDireccionTecnicaByProjectoId(proyectoId: string) {
    const resp = await fetch(`${BASE_URL}Direccion-tecnica/Get/${proyectoId}`);
    const data = await resp.json();
    return data;
  },

  async deletePropietario(id: string) {
    try {
      const response = await fetch(`${BASE_URL}Propietario/Borrar/${id}`, {
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
      console.error("Error al eliminar propietario: ", error);
      throw error;
    }
  },

  async deleteProyectista(id: string) {
    try {
      const response = await fetch(`${BASE_URL}Proyectista/Borrar/${id}`, {
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
      console.error("Error al eliminar proyectista: ", error);
      throw error;
    }
  },

  async deleteDireccionTecnica(id: string) {
    try {
      const response = await fetch(
        `${BASE_URL}Direccion-tecnica/Borrar/${id}`,
        {
          method: "DELETE",
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
      console.error("Error al eliminar direccion tecnica: ", error);
      throw error;
    }
  },
};
