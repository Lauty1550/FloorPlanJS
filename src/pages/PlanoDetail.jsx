import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { fileService } from "../service/FileService";
import { planoService } from "../service/PlanoService";
import { etiquetaService } from "../service/EtiquetaService";
import DeleteIconButton from "../img/DeleteIcon";
import CancelIcon from "../img/CancelIcon";
import ConfirmIcon from "../img/confirmIcon";
import ModalDelete from "../components/ModalDelete";
import SaveCutIcon from "../img/SaveCutIcon";
import ZoomInIcon from "../img/ZoomIn";
import ZoomOutIcon from "../img/ZoomOut";
import ClosePlanoIcon from "../img/ClosePlano";
import ZoomResetIcon from "../img/ZoomReset";
import FullScreenIcon from "../img/FullScreen";
import BackArrowIcon from "../img/BackArrowSVG";
import CutIcon from "../img/CutIcon";
import CleanSelectionIcon from "../img/CleanSelectionIcon";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Toast from "../components/Toast";
import SpinLoader from "../components/Loader";
import "../css/PlanoDetail.css";
import "../css/Zoom.css";
import "../css/FullScreen.css";
import "react-image-crop/src/ReactCrop.scss";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import NewEtiqueta from "../components/NewEtiqueta";

export default function PlanoDetail() {
  const { id } = useParams();
  const [plano, setPlano] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [archivoUrl, setArchivoUrl] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const location = useLocation();
  const [cutEnable, setCutEnable] = useState(false);
  const [cutColor, setCutColor] = useState("White");
  const cropperRef = useRef(null);
  const onCrop = () => {
    // eslint-disable-next-line no-unused-vars
    const cropper = cropperRef.current?.cropper;
  };
  const [showForm, setShowForm] = useState(false);
  const [croppedFile, setCroppedFile] = useState();

  const proyectoNombre = location.state?.proyectoNombre;
  const navigate = useNavigate();
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetaFullScreen, setEtiquetaFullScreen] = useState(false);
  const [etiquetaFullScreenArchivo, setEtiquetaFullScreenArchivo] =
    useState(null);
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [selectedEtiquetas, setSelectedEtiquetas] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [cantEtiquedasToDelete, setCantEtiquetasToDelete] = useState("");

  useEffect(() => {
    if (id) {
      handleGetPlano(id);
    } else {
      toast.error("Error al obtener el ID del plano");
      setIsloading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullScreen]);

  async function handleGetPlano(id) {
    setIsloading(true);
    try {
      const data = await planoService.getPlanoById(id);
      setPlano(data);
      const etiquetasTemp = data.etiquetas;
      for (const etiqueta of etiquetasTemp) {
        await handleGetFileEtiqueta(etiqueta);
      }
      setEtiquetas(etiquetasTemp);
      console.log("Plano obtenido");

      if (data.archivoUrl) {
        handleGetFile(data.archivoUrl);
      }
    } catch (error) {
      setIsloading(false);
      toast.error("Error al obtener plano");
      console.error("Error al obtener plano:", error);
    }
  }

  async function handleGetFile(archivoUrl) {
    setIsloading(true);
    try {
      const url = await fileService.obtenerArchivo(archivoUrl);
      setArchivoUrl(url);
    } catch (error) {
      toast.error("Error al cargar el archivo");
      console.error("Error al cargar archivo:", error);
    } finally {
      setIsloading(false);
    }
  }

  async function handleGetFileEtiqueta(etiqueta) {
    try {
      const url = await fileService.obtenerArchivo(etiqueta.archivoUrl);
      etiqueta.preview = url;
    } catch (error) {
      toast.error("Error al cargar el archivo etiqueta");
      console.error("Error al cargar archivo etiqueta:", error);
    }
  }

  const handleBack = () => {
    navigate(`/proyectos/${plano?.proyectoId}`);
  };

  function toggleFullScreen() {
    setIsFullScreen(!isFullScreen);
    setCutEnable(false);
    setCutColor("white");
    setEtiquetaFullScreen(false);
  }

  function clearCropBox() {
    if (cropperRef.current) {
      cropperRef.current.cropper.clear();
    }
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

  function handleShowForm() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  function cropperClear() {
    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      toast.error("No se pudo acceder al .");
      return;
    }

    cropper.clear();
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

  function renderArchivo() {
    if (!archivoUrl || !plano) {
      return <p>No hay archivo disponible</p>;
    }
    const tipoArchivo = plano.tipoArchivo;

    if (tipoArchivo === "image") {
      return (
        <>
          {isFullScreen ? (
            <div className="modal-fullscreen">
              <div className="zoom-controls-fullScreen modal-controls">
                <button onClick={saveCroppedImage} title="Guardar recorte">
                  <SaveCutIcon color="white" />
                </button>
                <button onClick={zoomIn} title="Zoom In">
                  <ZoomInIcon color="white" />
                </button>
                <button onClick={zoomOut} title="Zoom Out">
                  <ZoomOutIcon color="white" />
                </button>
                <button onClick={enableCrop} title="Habilitar recorte">
                  <CutIcon color={cutColor} />
                </button>
                <button onClick={clearCropBox} title="Limpiar recorte">
                  <CleanSelectionIcon color="white" />
                </button>
                <button onClick={resetImage} title="Reset">
                  <ZoomResetIcon color="white" />
                </button>
                <button onClick={toggleFullScreen} title="Cerrar">
                  <ClosePlanoIcon color="white" />
                </button>
              </div>
              <div className="modal-fullscreen-window">
                {etiquetaFullScreen ? (
                  <Cropper
                    src={etiquetaFullScreenArchivo}
                    initialAspectRatio={16 / 9}
                    guides={cutEnable}
                    crop={onCrop}
                    ref={cropperRef}
                    dragMode={"move"}
                    toggleDragModeOnDblclick={false}
                    zoomable
                    movable
                    cropBoxResizable={true}
                    cropBoxMovable={true}
                    autoCrop={false}
                    background={false}
                    minCanvasWidth={50}
                    minCropBoxHeight={50}
                  />
                ) : (
                  <Cropper
                    src={archivoUrl}
                    initialAspectRatio={16 / 9}
                    guides={cutEnable}
                    crop={onCrop}
                    ref={cropperRef}
                    dragMode={"move"}
                    toggleDragModeOnDblclick={false}
                    zoomable
                    movable
                    cropBoxResizable={true}
                    cropBoxMovable={true}
                    autoCrop={false}
                    background={false}
                    minCanvasWidth={50}
                    minCropBoxHeight={50}
                  />
                )}
              </div>
            </div>
          ) : (
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              wheel={{ disabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div
                    className={`${
                      isFullScreen
                        ? "zoom-controls-fullScreen"
                        : "zoom-controls"
                    } `}
                  >
                    <button onClick={handleBack} title="Volver">
                      <BackArrowIcon color="black" />
                    </button>
                    <button onClick={() => zoomIn()} title="Zoom In">
                      <ZoomInIcon color="black" />
                    </button>
                    <button onClick={() => zoomOut()} title="Zoom Out">
                      <ZoomOutIcon color="black" />
                    </button>
                    <button onClick={() => resetTransform()} title="Reset Zoom">
                      <ZoomResetIcon color="black" />
                    </button>
                    <button onClick={toggleFullScreen} title="FullScreen">
                      {" "}
                      <FullScreenIcon color="black" />
                    </button>
                  </div>
                  <div className="image-plano">
                    <TransformComponent>
                      <img src={archivoUrl} alt="Vista previa del archivo" />
                    </TransformComponent>
                  </div>
                </>
              )}
            </TransformWrapper>
          )}
        </>
      );
    }

    return <p>El archivo no se puede mostrar</p>;
  }

  if (!plano && !isLoading) {
    return <h1 className="titulo-page mb-5"> Error al obtener plano</h1>;
  }

  function handleEtiquetaClick(archivoEtiqueta) {
    console.log(archivoEtiqueta);
    setEtiquetaFullScreenArchivo(archivoEtiqueta);
    setEtiquetaFullScreen(true);
    setIsFullScreen(true);
  }

  function handleDeleteStart() {
    setDeleteEnable(true);
  }

  function selectEtiquetaToDelete(id) {
    setSelectedEtiquetas((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((etiquetaId) => etiquetaId !== id)
        : [...prevSelected, id]
    );
  }
  function handleDeleteCancel() {
    setDeleteEnable(false);
    setSelectedEtiquetas([]);
  }

  function handleConfirmDelete() {
    if (selectedEtiquetas.length > 0) {
      setCantEtiquetasToDelete(selectedEtiquetas.length.toString());
      setShowConfirmationModal(true);
    } else {
      toast.info("Seleccione al menos una etiqueta");
    }
  }

  async function deleteEtiquetas() {
    try {
      for (const etiqueta of selectedEtiquetas) {
        await etiquetaService.deleteEtiquetaById(etiqueta);
      }
      setDeleteEnable(false);
      setSelectedEtiquetas([]);
      handleGetPlano(id);
      toast.success("Etiqueta(s) eliminada(s)");
    } catch (error) {
      console.error("Error al eliminar etiqueta(s): ", error);
      throw error;
    }
  }

  return (
    <>
      <Toast />
      <SpinLoader isLoading={isLoading} />
      <main
        className={`table-container ${isLoading ? "invisible" : "visible"} `}
      >
        {showForm && (
          <NewEtiqueta
            proyectoId={plano?.proyectoId}
            file={croppedFile}
            planoId={id}
            onClose={handleCloseForm}
            clear={cropperClear}
            onUpdate={() => handleGetPlano(id)}
          />
        )}
        <h1 className="titulo-page mb-5">
          {" "}
          Plano <span className="titulo-azul">{plano?.especialidad}</span> del
          proyecto <span className="titulo-azul">{proyectoNombre}</span>{" "}
        </h1>

        {renderArchivo()}

        <div>
          <h2 className="mt-5 titulo-page">Etiquetas</h2>
          {etiquetas.length > 0 && (
            <div style={{ display: "inline-flex", gap: "10px" }}>
              <button
                className={`${
                  deleteEnable ? "cancel-button " : "transparent-button"
                } `}
                onClick={handleDeleteCancel}
                title="Cancelar"
              >
                <CancelIcon color="black" />
              </button>

              <DeleteIconButton
                onClick={handleDeleteStart}
                className="margen-derecha"
              />

              <button
                className={`${
                  deleteEnable ? "cancel-button " : "transparent-button"
                } `}
                onClick={handleConfirmDelete}
                title="Confirmar"
              >
                <ConfirmIcon color="red" />
              </button>
            </div>
          )}
        </div>

        <section>
          {etiquetas.length > 0 ? (
            <div className="container-plano">
              <div className="row">
                {etiquetas.map((etiqueta) =>
                  deleteEnable ? (
                    <div
                      key={etiqueta.id}
                      className=" mt-5 col-md-6"
                      onClick={() => selectEtiquetaToDelete(etiqueta.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card">
                        <div
                          className={`card-body-proyecto  ${
                            selectedEtiquetas.includes(etiqueta.id)
                              ? "selected-card"
                              : ""
                          }`}
                        >
                          <h5 className="card-title">{etiqueta.nombre}</h5>

                          {etiqueta.archivoUrl && etiqueta.preview && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                className="preview-image"
                                src={etiqueta.preview}
                                alt="Vista previa"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={etiqueta.id}
                      className=" mt-5 col-md-6"
                      onClick={() => handleEtiquetaClick(etiqueta.preview)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card">
                        <div className="card-body-proyecto">
                          <h5 className="card-title">{etiqueta.nombre}</h5>

                          {etiqueta.archivoUrl && etiqueta.preview && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                className="preview-image"
                                src={etiqueta.preview}
                                alt="Vista previa"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <h1 className="mt-5"> El plano no posee etiquetas</h1>
          )}
        </section>
        <ModalDelete
          show={showConfirmationModal}
          schemaName="etiqueta(s)"
          onClose={() => setShowConfirmationModal(false)}
          leyenda={cantEtiquedasToDelete}
          onDelete={deleteEtiquetas}
        />
      </main>
    </>
  );
}
