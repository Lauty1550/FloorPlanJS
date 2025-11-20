import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import DemoAuthProvider from "./context/DemoAuthProvider.jsx";

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/home",
      }}
    >
      <DemoAuthProvider>
        <App />
      </DemoAuthProvider>
    </Auth0Provider>
  </StrictMode>
);
