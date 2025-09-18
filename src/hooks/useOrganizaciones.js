import { useContext, useEffect } from "react";
import { OrganizacionContext } from "../context/OrganizacionContext";

export default function useOrganizaciones() {
  const { handleGetOrganizaciones } = useContext(OrganizacionContext);

  useEffect(() => {
    handleGetOrganizaciones();
  }, []);
}
