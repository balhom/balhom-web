import "./app-delete-dialog.css";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const AppDeleteDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: Props) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return createPortal(
    <div className="app-delete-dialog-overlay" onClick={onClose}>
      <div className="app-delete-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="app-delete-dialog-header">
          <h2 className="app-delete-dialog-title">{title}</h2>
          <p className="app-delete-dialog-message">{message}</p>
        </div>
        <div className="app-delete-dialog-actions">
          <button
            className="app-delete-dialog-button confirm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {t("common.delete")}
          </button>
          <button className="app-delete-dialog-button cancel" onClick={onClose}>
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AppDeleteDialog;
