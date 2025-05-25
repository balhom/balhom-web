import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React from "react";
import AppNotFoundPage from "./common/pages/app-not-found-page/app-not-found-page";
import { currencyProfileRoutes } from "./modules/currency-profile/routes";
import { CurrencyProfilesProvider } from "./modules/currency-profile/states/providers/currency-profiles-provider";
import { dashboardRoutes } from "./modules/dashboard/routes";
import AppMainLayout from "./common/components/app-main-layout/app-main-layout";
import { transactionsRoutes } from "./modules/transactions/routes";
import { settingsRoutes } from "./modules/settings/routes";
import { OidcProvider } from "./common/config/oidc";
import AppLoaderPage from "./common/pages/app-loader-page/app-loader-page";
import AppErrorPage from "./common/pages/app-error-page/app-error-page";
import { useTranslation } from "react-i18next";

export const AppRouter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <OidcProvider
              fallback={<AppLoaderPage />}
              ErrorFallback={() => (
                <AppErrorPage
                  title={t("common.conectionError")}
                  message={t("common.conectionErrorMessage")}
                />
              )}
            >
              <Outlet />
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
