import "./change-password-settings-button.css";
import { KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onClick?: () => void;
}

const ChanngePasswordSettingsButton: React.FC<Props> = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <button className="change-password-settings-button" onClick={onClick}>
      <KeyRound size={18} />

      {t("settings.changePassword")}
    </button>
  );
};

export default ChanngePasswordSettingsButton;
