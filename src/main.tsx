import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./global.css";
import { ThemeModeProvider } from "./common/states/providers/theme-mode-provider.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </Provider>
  </StrictMode>
);
