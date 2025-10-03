const BASE_URL = import.meta.env.VITE_BASE_URL + "Archivo";

export const fileService = {
  async subirArchivo(archivo) {
    try {
      const formData = new FormData();
      formData.append("file", archivo);

      const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error al subir archivo: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en subirArchivo:", error);
      throw error;
    }
  },
  async obtenerArchivo(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error al obtener el archivo: ${response.statusText}`);
      }

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      return url;
    } catch (error) {
      console.error("Error en obtenerArchivo:", error);
      throw error;
    }
  },
};
