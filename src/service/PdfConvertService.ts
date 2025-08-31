const BASE_URL = import.meta.env.VITE_BASE_URL + "pdf";

export const PdfService = {
  async convertirPdf(archivo: File) {
    const formData = new FormData();
    formData.append("file", archivo);

    try {
      const response = await fetch(`${BASE_URL}/convert-multi`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error al convertir el PDF: ${response.statusText}`);
      }

      const imageBlob = await response.blob();

      // Puedes retornar el blob o convertirlo a URL para mostrarlo en el frontend

      return imageBlob;
    } catch (error) {
      console.error("Error al convertir el PDF:", error);
      throw error;
    }
  },
};
