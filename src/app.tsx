import "./i18n/config";
import { AppRouter } from "./app-router";
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { registerLocale } from "react-datepicker";

function App() {
  registerLocale("en", enUS);
  registerLocale("es", es);

  return <AppRouter />;
}

export default App;
