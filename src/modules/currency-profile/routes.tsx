import { Route } from "react-router-dom";
import CreateCurrencyProfilePage from "./pages/create-currency-profile-page/create-currency-profile-page";

export const CREATE_CURRENCY_PROFILE_ROUTE_PATH = "/create-currency-profile";

export const currencyProfileRoutes = () => {
  return (
    <>
      <Route
        path={CREATE_CURRENCY_PROFILE_ROUTE_PATH}
        element={<CreateCurrencyProfilePage />}
      />
    </>
  );
};
