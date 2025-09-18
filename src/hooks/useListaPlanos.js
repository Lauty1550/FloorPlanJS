import { useContext } from "react";
import { PlanoContext } from "../context/PlanoContext";

export default function useListaPlanos() {
  const { setSelectedPlanos } = useContext(PlanoContext);

  function selectPlanoToDelete(id) {
    setSelectedPlanos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((planoId) => planoId !== id)
        : [...prevSelected, id]
    );
  }

  return { selectPlanoToDelete };
}
