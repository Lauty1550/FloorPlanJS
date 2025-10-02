import { useContext } from "react";
import useRenderPlano from "../hooks/useRenderPlano";
import { PlanoDetailContext } from "../context/PlanoDetailContext";
import { Cropper } from "react-cropper";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SaveCutIcon from "../img/SaveCutIcon";
import ZoomInIcon from "../img/ZoomIn";
import ZoomOutIcon from "../img/ZoomOut";
import ZoomResetIcon from "../img/ZoomReset";
import CutIcon from "../img/CutIcon";
import CleanSelectionIcon from "../img/CleanSelectionIcon";
import ClosePlanoIcon from "../img/ClosePlano";
import BackArrowIcon from "../img/BackArrowSVG";
import FullScreenIcon from "../img/FullScreen";

export default function RenderPlano() {
  const {
    cutColor,
    enableCrop,
    onCrop,
    clearCropBox,
    resetImage,
    saveCroppedImage,
    toggleFullScreen,
    zoomIn,
    zoomOut,
    cutEnable,
    handleBack,
  } = useRenderPlano();
  const {
    archivoUrl,
    isFullScreen,
    planoRender,
    cropperRef,
    etiquetaFullScreen,
    etiquetaFullScreenArchivo,
  } = useContext(PlanoDetailContext);

  if (!archivoUrl || !planoRender) {
    return <p>No hay archivo disponible</p>;
  }

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
                  isFullScreen ? "zoom-controls-fullScreen" : "zoom-controls"
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
