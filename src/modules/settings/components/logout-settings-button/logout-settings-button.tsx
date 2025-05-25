import "./logout-settings-button.css";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onClick?: () => void;
}

const LogoutSettingsButton: React.FC<Props> = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <button className="logout-settings-button" onClick={onClick}>
      <LogOut size={18} />
      {t("settings.logoutButton")}
    </button>
  );
};

export default LogoutSettingsButton;
