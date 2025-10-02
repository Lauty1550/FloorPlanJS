import { useRef, useState } from "react";
import { PlanoDetailContext } from "./PlanoDetailContext";

export default function PlanoDetailProvider({ children }) {
  const [planoRender, setPlanoRender] = useState();
  const [archivoUrl, setArchivoUrl] = useState(null);
  const cropperRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [croppedFile, setCroppedFile] = useState();
  const [showForm, setShowForm] = useState(false);
  const [etiquetaFullScreen, setEtiquetaFullScreen] = useState(false);
  const [etiquetaFullScreenArchivo, setEtiquetaFullScreenArchivo] =
    useState(null);
  const [etiquetas, setEtiquetas] = useState([]);
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [selectedEtiquetas, setSelectedEtiquetas] = useState([]);
  const [cantEtiquedasToDelete, setCantEtiquetasToDelete] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <PlanoDetailContext.Provider
      value={{
        planoRender,
        setPlanoRender,
        archivoUrl,
        setArchivoUrl,
        cropperRef,
        isFullScreen,
        setIsFullScreen,
        croppedFile,
        setCroppedFile,
        showForm,
        setShowForm,
        etiquetaFullScreen,
        setEtiquetaFullScreen,
        etiquetaFullScreenArchivo,
        setEtiquetaFullScreenArchivo,
        etiquetas,
        setEtiquetas,
        deleteEnable,
        setDeleteEnable,
        selectedEtiquetas,
        setSelectedEtiquetas,
        cantEtiquedasToDelete,
        setCantEtiquetasToDelete,
        showConfirmationModal,
        setShowConfirmationModal,
      }}
    >
      {children}
    </PlanoDetailContext.Provider>
  );
}
