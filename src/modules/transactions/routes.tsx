import { Route } from "react-router-dom";
import DashboardPage from "../dashboard/pages/dashboard-page/dashboard-page";

export const INCOME_ROUTE_PATH = "/income";
export const EXPENSE_ROUTE_PATH = "/expense";

export const transactionsRoutes = () => {
  return (
    <>
      <Route path={INCOME_ROUTE_PATH} element={<DashboardPage />} />
      <Route path={EXPENSE_ROUTE_PATH} element={<DashboardPage />} />
    </>
  );
};
