import React, { useEffect, useState } from "react";
import { keycloakInstance } from "../../../common/config/keycloak";
import AppLoaderPage from "../../../common/pages/app-loader-page/app-loader-page";

interface AuthProtectedRouteProps {
  children: JSX.Element;
}

export const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({
  children,
}) => {
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    keycloakInstance.onReady = () => {
      if (!keycloakInstance.authenticated) {
        keycloakInstance
          .createLoginUrl()
          .then((loginUrl) => (window.location.href = loginUrl));
      } else {
        setIsAuthReady(true);
      }
    };
  }, []);

  // TODO change
  const isEmailVerified = true;

  if (!isAuthReady) {
    return <AppLoaderPage />;
  }

  // If email has not being verified
  else if (!isEmailVerified) {
    // TODO
  }

  return children;
};
