import { Route } from "react-router-dom";
import DashboardPage from "../dashboard/pages/dashboard-page/dashboard-page";

export const SETTINGS_ROUTE_PATH = "/settings";

export const transactionsRoutes = () => {
  return (
    <>
      <Route path={SETTINGS_ROUTE_PATH} element={<DashboardPage />} />
    </>
  );
};
