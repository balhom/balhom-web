import { Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard-page/dashboard-page";

export const DASHBOARD_ROUTE_PATH = "/";

export const dashboardRoutes = () => {
  return (
    <>
      <Route path={DASHBOARD_ROUTE_PATH} element={<DashboardPage />} />
    </>
  );
};
