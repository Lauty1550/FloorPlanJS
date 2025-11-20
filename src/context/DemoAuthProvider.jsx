import { useState } from "react";
import { DemoAuthContext } from "./DemoAuthContext";

export default function DemoAuthProvider({ children }) {
  const demoUserId = import.meta.env.VITE_APP_DEMO_USER_ID;
  const demoEmail = import.meta.env.VITE_APP_DEMO_EMAIL;
  const demoName = import.meta.env.VITE_APP_DEMO_NAME;

  const [isAuthenticated] = useState(true);

  const storedOrgId = localStorage.getItem("organizacionId");
  const storedOrgName = localStorage.getItem("organizacionName");

  const [user, setUser] = useState({
    sub: demoUserId,
    email: demoEmail,
    name: demoName,
    organizacionId: storedOrgId || "679c1e678b0385269bc11b75",
    organizacionName: storedOrgName || "Construcciones SA",
  });

  const loginWithRedirect = async () => {
    /* no-op */
  };
  const logout = () => {
    /* no-op */
  };

  const [isLoading] = useState(false);

  //   const value = {
  //     isAuthenticated,
  //     user,
  //     loginWithRedirect,
  //     logout,
  //     isLoading,
  //   };

  return (
    <DemoAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        loginWithRedirect,
        logout,
        isLoading,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
}
