import { useTranslation } from "react-i18next";
import "./language-picker.css";
import { Languages } from "lucide-react";

const LanguagePicker: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-picker">
      <Languages size={22} className="language-picker-icon" />

      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="en">{t("locale.english")}</option>
        <option value="es">{t("locale.spanish")}</option>
      </select>
    </div>
  );
};

export default LanguagePicker;
