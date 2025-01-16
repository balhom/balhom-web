import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, FileText, Download, Pencil } from 'lucide-react';
import { mockIncomes } from '../../../data/mock-incomes';
import { INCOME_CATEGORIES } from '../../../types/income';
import { formatCurrency } from '../../../utils/currency';
import { useCurrencyProfile } from '../../../hooks/use-currency-profile';
import './income-details.css';

// Mock attachments data
const mockAttachments = [
  {
    id: '1',
    name: 'Invoice_March_2024.pdf',
    size: '156 KB',
    date: '2024-03-15'
  },
  {
    id: '2',
    name: 'Receipt_123456.pdf',
    size: '89 KB',
    date: '2024-03-15'
  }
];

const IncomeDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { profile } = useCurrencyProfile();

  const income = mockIncomes.find(inc => inc.id === id);
  
  if (!income || !profile) return null;

  const categoryInfo = INCOME_CATEGORIES[income.category];
  const formattedDate = new Date(income.date).toLocaleDateString();

  const handleEdit = () => {
    // Will be implemented later
    console.log('Edit income:', income.id);
  };

  return (
    <div className="income-details">
      <div className="income-details-header">
        <button 
          className="back-button"
          onClick={() => navigate('/income')}
        >
          <ArrowLeft size={20} />
          {t('income.backToList')}
        </button>
        <button 
          className="edit-button"
          onClick={handleEdit}
        >
          <Pencil size={20} />
          {t('income.edit')}
        </button>
      </div>

      <div className="income-details-card">
        <div className="income-details-header">
          <h1 className="income-details-title">{income.title}</h1>
          <div className="income-details-amount">
            {formatCurrency(income.amount, profile.currency)}
          </div>
        </div>

        <div className="income-details-info">
          <div className="info-group">
            <div className="info-label">{t('income.category')}</div>
            <div className="category-info">
              <img
                src={categoryInfo.image}
                alt={categoryInfo.name}
                className="category-image"
              />
              <span className="category-name">{categoryInfo.name}</span>
            </div>
          </div>

          <div className="info-group">
            <div className="info-label">{t('income.date')}</div>
            <div className="info-value">{formattedDate}</div>
          </div>

          <div className="info-group">
            <div className="info-label">{t('income.description')}</div>
            <div className="info-value">{income.description}</div>
          </div>

          <div className="info-group attachments-section">
            <div className="info-label">{t('income.attachments')}</div>
            <div className="attachments-list">
              {mockAttachments.map(attachment => (
                <div key={attachment.id} className="attachment-item">
                  <FileText size={24} className="attachment-icon" />
                  <div className="attachment-info">
                    <div className="attachment-name">{attachment.name}</div>
                    <div className="attachment-meta">
                      {attachment.size} • {new Date(attachment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Download size={20} className="attachment-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;