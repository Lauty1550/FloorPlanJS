import { useAuth0 } from "@auth0/auth0-react";
import "../css/Login.css";

export default function LoginButton() {
  const { loginWithRedirect } = useContext(DemoAuthContext);
  return (
    <button className="login bg-dark mr-3" onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
}
