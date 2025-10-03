const BASE_URL = import.meta.env.VITE_BASE_URL + "File-Schema";
export const FileSchemaService = {
  async getFileType(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Error al obtener el archivo: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el tipo de archivo, ", error);
      throw error;
    }
  },
};
