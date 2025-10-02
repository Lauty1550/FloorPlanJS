import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import { toast } from "react-toastify";

export default function useRenderPlano() {
  const {
    planoRender,
    cropperRef,
    isFullScreen,
    setIsFullScreen,
    setCroppedFile,
    setEtiquetaFullScreen,
    setShowForm,
  } = useContext(PlanoDetailContext);

  const [cutEnable, setCutEnable] = useState(false);
  const [cutColor, setCutColor] = useState("White");
  const navigate = useNavigate();
  const onCrop = () => {
    // eslint-disable-next-line no-unused-vars
    const cropper = cropperRef.current?.cropper;
  };

  const handleBack = () => {
    navigate(`/proyectos/${planoRender?.proyectoId}`);
  };

  function toggleFullScreen() {
    setIsFullScreen(!isFullScreen);
    setCutEnable(false);
    setCutColor("white");
    setEtiquetaFullScreen(false);
  }

  function resetImage() {
    if (cropperRef.current) {
      cropperRef.current.cropper.reset();
      clearCropBox();
    }
  }

  function enableCrop() {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;

      if (cutEnable) {
        setCutColor("white");
        setCutEnable(false);
        cropper.setDragMode("move");
      } else {
        setCutColor("red");
        setCutEnable(true);
        cropper.setDragMode("crop");
      }
    }
  }

  function zoomIn() {
    if (cropperRef.current) {
      cropperRef.current.cropper.zoom(+0.2);
    }
  }

  function zoomOut() {
    if (cropperRef.current) {
      cropperRef.current.cropper.zoom(-0.2);
    }
  }

  function clearCropBox() {
    if (cropperRef.current) {
      cropperRef.current.cropper.clear();
    }
  }

  function handleShowForm() {
    setShowForm(true);
  }

  async function saveCroppedImage() {
    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      toast.error("No se pudo acceder al .");
      return;
    }

    const croppedCanvas = cropper.getCroppedCanvas();
    const cropBox = cropperRef.current.cropper.getCropBoxData();

    if (cropBox.height === undefined || cropBox.width === undefined) {
      toast.warning("Debe realizar un recorte antes de guardar la imagen.");
      return;
    }

    croppedCanvas.toBlob(async (blob) => {
      if (blob) {
        // Crea un archivo a partir del blob
        const file = new File([blob], "imagen_recortada.png", {
          type: "image/png",
        });

        setCroppedFile(file);
      }
    }, "image/png");

    handleShowForm();
  }

  return {
    cutColor,
    saveCroppedImage,
    zoomIn,
    zoomOut,
    enableCrop,
    clearCropBox,
    resetImage,
    toggleFullScreen,
    onCrop,
    cutEnable,
    handleBack,
  };
}
