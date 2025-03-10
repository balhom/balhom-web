import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React from "react";
import AppNotFoundPage from "./common/pages/app-not-found-page/app-not-found-page";
import { currencyProfileRoutes } from "./modules/currency-profile/routes";
import { AuthProtectedRoute } from "./modules/auth/routes/auth-protected-route";
import { AccountProvider } from "./modules/account/states/providers/account-provider";
import { CurrencyProfilesProvider } from "./modules/currency-profile/states/providers/currency-profiles-provider";
import { dashboardRoutes } from "./modules/dashboard/routes";
import AppMainLayout from "./common/components/app-main-layout/app-main-layout";
import { transactionsRoutes } from "./modules/transactions/routes";
import { settingsRoutes } from "./modules/settings/routes";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route
            element={
              <CurrencyProfilesProvider>
                <AppMainLayout>
                  <Outlet />
                </AppMainLayout>
              </CurrencyProfilesProvider>
            }
          >
            {dashboardRoutes()}
            {transactionsRoutes()}
            {settingsRoutes()}
          </Route>
        </Route>
        <Route path="*" element={<AppNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
