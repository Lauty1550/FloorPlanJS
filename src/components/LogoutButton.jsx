import { useContext } from "react";
import { DemoAuthContext } from "../context/DemoAuthContext";

export function LogoutButton() {
  const { logout } = useContext(DemoAuthContext);
  return (
    <a
      className="dropdown-item"
      href="#"
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: `${window.location.origin}/home`,
          },
        })
      }
    >
      Logout
    </a>
  );
}
