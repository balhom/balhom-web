import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import AppLoaderPage from "../../../common/pages/app-loader-page/app-loader-page";
import { sessionInstance } from "../services/instances";

const AUTH_REDIRECT_QUERY_PARAM = "recirect";

interface Props {
  children: JSX.Element;
}

export const AuthRedirectRoute: React.FC<Props> = ({ children }) => {
  // TODO remove
  return children;
  
  const [searchParams] = useSearchParams();

  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  const redirectTo = searchParams.get(AUTH_REDIRECT_QUERY_PARAM);

  useEffect(() => {
    // TODO when auth data is ready
    setIsAuthReady(true);
  }, []);

  if (!isAuthReady) {
    return <AppLoaderPage />;
  }

  if (sessionInstance.isLoggedIn) {
    return <Navigate to={redirectTo ?? "/"} replace />;
  }

  return children;
};
