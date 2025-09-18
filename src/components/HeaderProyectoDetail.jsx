import { Link } from "react-router";
import ConfirmIcon from "../img/confirmIcon";
import DeleteIconButton from "../img/DeleteIcon";
import CancelIcon from "../img/CancelIcon";
import BackArrowIcon from "../img/BackArrowSVG";
import ButtonAdd from "./ButtonAdd";
import useHeaderProyectoDetail from "../hooks/useHeaderProyectoDetail";
import { useContext } from "react";
import { PlanoContext } from "../context/PlanoContext";

export default function HeaderProyectoDetail() {
  const {
    handleAddPlano,
    handleConfirmDelete,
    handleDeleteCancel,
    handleDeleteStart,
  } = useHeaderProyectoDetail();

  const { planos, deleteEnable } = useContext(PlanoContext);

  return (
    <>
      <div className="action-bar overflow-auto">
        <div className="center-buttons">
          <Link to="/proyectos" className="back-button">
            <button className="back-button" title="Volver">
              <BackArrowIcon color="black" />
            </button>
          </Link>

          <ButtonAdd
            onClick={handleAddPlano}
            text="Agregar Plano"
            type="button"
          />
        </div>

        <div className="derecha">
          <button
            className={`${
              deleteEnable ? "cancel-button " : "transparent-button"
            } `}
            onClick={handleDeleteCancel}
            title="Cancelar"
          >
            <CancelIcon color="black" />
          </button>

          {planos.length > 0 && (
            <DeleteIconButton
              onClick={handleDeleteStart}
              className="margen-derecha"
            />
          )}

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
      </div>
    </>
  );
}
