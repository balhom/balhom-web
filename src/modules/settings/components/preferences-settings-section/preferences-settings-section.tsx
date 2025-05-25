import "./preferences-settings-section.css";
import { useTranslation } from "react-i18next";
import LanguagePicker from "../../components/language-picker/language-picker";
import ThemeButton from "../../components/theme-button/theme-button";

const PreferencesSettingsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="preferences-settings-section">
      <div className="preferences-settings-section-header">
        <h2 className="preferences-settings-section-title">
          {t("settings.appPreferences")}
        </h2>

        <p className="preferences-settings-section-description">
          {t("settings.appPreferencesDescription")}
        </p>
      </div>

      <div className="preferences-settings-list">
        <div className="preferences-settings-item">
          <div>
            <div className="preferences-settings-item-title">
              {t("settings.language")}
            </div>

            <div className="preferences-settings-item-description">
              {t("settings.languageDescription")}
            </div>
          </div>

          <LanguagePicker />
        </div>

        <div className="preferences-settings-item">
          <div>
            <div className="preferences-settings-item-title">
              {t("settings.theme")}
            </div>

            <div className="preferences-settings-item-description">
              {t("settings.themeDescription")}
            </div>
          </div>

          <ThemeButton />
        </div>
      </div>
    </section>
  );
};

export default PreferencesSettingsSection;
