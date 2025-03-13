import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React from "react";
import AppNotFoundPage from "./common/pages/app-not-found-page/app-not-found-page";
import { currencyProfileRoutes } from "./modules/currency-profile/routes";
import { AccountProvider } from "./modules/account/states/providers/account-provider";
import { CurrencyProfilesProvider } from "./modules/currency-profile/states/providers/currency-profiles-provider";
import { dashboardRoutes } from "./modules/dashboard/routes";
import AppMainLayout from "./common/components/app-main-layout/app-main-layout";
import { transactionsRoutes } from "./modules/transactions/routes";
import { settingsRoutes } from "./modules/settings/routes";
import { OidcProvider } from "./common/config/oidc";
import AppLoaderPage from "./common/pages/app-loader-page/app-loader-page";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <OidcProvider fallback={<AppLoaderPage />}>
              <AccountProvider>
                <Outlet />
              </AccountProvider>
            </OidcProvider>
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
