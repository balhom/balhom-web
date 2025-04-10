import "./theme-button.css";
import { Moon, Sun } from "lucide-react";
import { ThemeModeEnum } from "../../../../common/data/enums/theme-mode-enum";
import { useTheme } from "../../../../common/states/contexts/theme-mode-context";
import { useTranslation } from "react-i18next";

const ThemeButton: React.FC = () => {
  const { t } = useTranslation();

  const { themeMode, setThemeMode } = useTheme();

  return (
    <button
      className={`theme-button ${
        themeMode === ThemeModeEnum.Dark ? "dark" : "light"
      }`}
      onClick={() => {
        setThemeMode(
          themeMode === ThemeModeEnum.Dark
            ? ThemeModeEnum.Light
            : ThemeModeEnum.Dark
        );
      }}
      aria-label={t("settings.toggleTheme")}
    >
      {themeMode === ThemeModeEnum.Dark ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
      <span className="theme-label">
        {ThemeModeEnum.Dark ? t("settings.lightMode") : t("settings.darkMode")}
      </span>
    </button>
  );
};

export default ThemeButton;
