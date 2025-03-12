import { useEffect, useState } from "react";
import { ThemeModeContext } from "../contexts/theme-mode-context";
import { ThemeModeEnum } from "../../data/enums/theme-mode-enum";

const THEME_MODE_KEY = "theme";

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState(() => {
    const savedThemeMode = localStorage.getItem(THEME_MODE_KEY);

    if (savedThemeMode == ThemeModeEnum.Light) {
      return ThemeModeEnum.Light;
    } else if (savedThemeMode == ThemeModeEnum.Dark) {
      return ThemeModeEnum.Dark;
    }

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      return ThemeModeEnum.Dark;
    }

    return ThemeModeEnum.Light;
  });

  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, themeMode);

    document.documentElement.classList.toggle(
      "dark",
      themeMode == ThemeModeEnum.Dark
    );
  }, [themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}
