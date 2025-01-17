import React from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { sessionInstance } from "../services/instances";
import { LOGIN_ROUTE_PATH, VERIFY_EMAIL_ROUTE_PATH } from "../routes";
import { LOGIN_REDIRECT_QUERY_PARAM } from "../pages/login-page/login-page";

interface AuthProtectedRouteProps {
  children: JSX.Element;
}

export const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({
  children,
}) => {
  const prevLocation = useLocation();

  // TODO change
  const isEmailVerified = true;

  // If user is not logged in and current page is not login
  if (
    !sessionInstance.isLoggedIn &&
    prevLocation.pathname !== LOGIN_ROUTE_PATH
  ) {
    if (prevLocation.pathname === "/") {
      return <Navigate to={LOGIN_ROUTE_PATH} replace />;
    }
    return (
      <Navigate
        to={`${LOGIN_ROUTE_PATH}?${LOGIN_REDIRECT_QUERY_PARAM}=${prevLocation.pathname}`}
        replace
      />
    );
  }
  // If user is not logged in and email has not being verified
  else if (sessionInstance.isLoggedIn && !isEmailVerified) {
    return <Navigate to={`${VERIFY_EMAIL_ROUTE_PATH}`} replace />;
  }

  return children;
};
