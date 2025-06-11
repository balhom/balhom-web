import "./delete-settings-button.css";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const DeleteSettingsButton: React.FC<Props> = ({
  text,
  onClick,
  isDisabled,
}: Props) => {
  const { t } = useTranslation();

  return (
    <button
      className="delete-settings-button"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Trash2 size={18} />
      {text ?? t("settings.deleteButton")}
    </button>
  );
};

export default DeleteSettingsButton;
