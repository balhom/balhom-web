import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { INCOME_CATEGORIES } from '../../../types/income';
import type { Income } from '../../../types/income';
import { formatCurrency } from '../../../utils/currency';
import DeleteDialog from '../../common/delete-dialog/delete-dialog';
import './income-card.css';

interface IncomeCardProps {
  income: Income;
  currency: string;
  onDelete?: (id: string) => void;
}

const IncomeCard = ({ income, currency, onDelete }: IncomeCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const categoryInfo = INCOME_CATEGORIES[income.category];
  const formattedDate = new Date(income.date).toLocaleDateString();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(income.id);
    }
  };

  return (
    <div className="income-card">
      <img
        src={categoryInfo.image}
        alt={categoryInfo.name}
        className="category-image"
      />
      <div className="income-content">
        <h3 className="income-title">{income.title}</h3>
        <div className="income-amount">
          {formatCurrency(income.amount, currency)}
        </div>
        <div className="income-date">{formattedDate}</div>
      </div>
      <div className="income-actions">
        <button
          className="action-button view-button"
          onClick={() => navigate(`/income/${income.id}`)}
          aria-label={t('income.viewIncome')}
        >
          <Eye size={20} />
        </button>
        {onDelete && (
          <button
            className="action-button delete-button"
            onClick={() => setIsDeleteDialogOpen(true)}
            aria-label={t('income.deleteIncome')}
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t('income.deleteConfirmTitle')}
        message={t('income.deleteConfirmMessage', { title: income.title })}
      />
    </div>
  );
};

export default IncomeCard;
