import { createContext, useContext } from "react";
import { ThemeModeEnum } from "../../data/enums/theme-mode-enum";

export interface ThemeModeContextState {
  themeMode: ThemeModeEnum;
  setThemeMode: (theme: ThemeModeEnum) => void;
}

export const ThemeModeContext = createContext<ThemeModeContextState>({
  themeMode: ThemeModeEnum.Light,
  setThemeMode: () => null,
});

export function useTheme(): ThemeModeContextState {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeModeProvider");
  }
  return context;
}
