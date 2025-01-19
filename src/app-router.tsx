import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React from "react";
import AppNotFoundPage from "./common/pages/app-not-found-page/app-not-found-page";
import { AuthRedirectRoute } from "./modules/auth/routes/auth-redirect-route";
import { authRoutes } from "./modules/auth/routes";
import { currencyProfileRoutes } from "./modules/currency-profile/routes";

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
          {
            // TODO Move to authenticated routes
            currencyProfileRoutes()
          }
        </Route>
        {/*
        <Route
          element={
            <AuthProtectedRoute>
              <AccountProvider>
                <Outlet />
              </AccountProvider>
            </AuthProtectedRoute>
          }
        >
          {
            // TODO REMOVE
          }
        </Route>
        */}
        <Route path="*" element={<AppNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
