import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import './delete-dialog.css';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteDialog = ({ isOpen, onClose, onConfirm, title, message }: DeleteDialogProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return createPortal(
    <div className="delete-dialog-overlay" onClick={onClose}>
      <div className="delete-dialog" onClick={e => e.stopPropagation()}>
        <div className="delete-dialog-header">
          <h2 className="delete-dialog-title">{title}</h2>
          <p className="delete-dialog-message">{message}</p>
        </div>
        <div className="delete-dialog-actions">
          <button 
            className="delete-dialog-button cancel"
            onClick={onClose}
          >
            {t('common.cancel')}
          </button>
          <button 
            className="delete-dialog-button confirm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {t('common.delete')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteDialog;