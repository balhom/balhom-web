import { Route } from "react-router-dom";
import SettingsPage from "./pages/settings-page/settings-page";

export const SETTINGS_ROUTE_PATH = "/settings";

export const settingsRoutes = () => {
  return (
    <>
      <Route path={SETTINGS_ROUTE_PATH} element={<SettingsPage />} />
    </>
  );
};
