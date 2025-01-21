import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React from "react";
import AppNotFoundPage from "./common/pages/app-not-found-page/app-not-found-page";
import { AuthRedirectRoute } from "./modules/auth/routes/auth-redirect-route";
import { authRoutes } from "./modules/auth/routes";
import { currencyProfileRoutes } from "./modules/currency-profile/routes";
import { AuthProtectedRoute } from "./modules/auth/routes/auth-protected-route";
import { AccountProvider } from "./modules/account/states/providers/account-provider";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthRedirectRoute>
              <Outlet />
            </AuthRedirectRoute>
          }
        >
          {authRoutes()}
        </Route>
        <Route
          element={
            <AuthProtectedRoute>
              <AccountProvider>
                <Outlet />
              </AccountProvider>
            </AuthProtectedRoute>
          }
        >
          {currencyProfileRoutes()}
        </Route>
        <Route path="*" element={<AppNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
