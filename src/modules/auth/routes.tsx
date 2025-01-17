import { Route } from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";

export const LOGIN_ROUTE_PATH = "/login";
export const REGISTER_ROUTE_PATH = "/register";
export const VERIFY_EMAIL_ROUTE_PATH = "/verify-email";
export const FORGOT_PASSWORD_ROUTE_PATH = "/forgot-password";

export const authRoutes = () => {
  return (
    <>
      <Route path={LOGIN_ROUTE_PATH} element={<LoginPage />} />
      <Route path={REGISTER_ROUTE_PATH} element={<RegisterPage />} />
    </>
  );
};
