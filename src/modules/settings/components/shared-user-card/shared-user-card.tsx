import { X } from "lucide-react";
import "./shared-user-card.css";
import { useTranslation } from "react-i18next";

interface Props {
  email: string;
  handleRemoveUser: () => void;
}

const SharedUserCard: React.FC<Props> = ({
  email,
  handleRemoveUser,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div key={email} className="shared-user-card">
      <span className="shared-user-card-email">{email}</span>

      <button
        className="shared-user-card-remove-user-button"
        onClick={handleRemoveUser}
        aria-label={t("settings.removeUser")}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default SharedUserCard;
