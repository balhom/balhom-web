import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { type IncomeCategory } from '../../../types/income';
import { useCurrencyProfile } from '../../../hooks/use-currency-profile';
import CategorySelect from '../../../components/forms/category-select/category-select';
import FileUpload from '../../../components/forms/file-upload/file-upload';
import './add-income.css';

const AddIncome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useCurrencyProfile();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IncomeCategory>('salary');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [files, setFiles] = useState<File[]>([]);

  if (!profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented later
    console.log('Form submitted:', { 
      title, 
      amount, 
      description, 
      category, 
      date,
      files 
    });
    navigate('/income');
  };

  return (
    <div className="add-income">
      <button 
        className="add-income-back-button"
        onClick={() => navigate('/income')}
      >
        <ArrowLeft size={20} />
        {t('income.backToList')}
      </button>

      <div className="add-income-card">
        <div className="add-income-header">
          <h1 className="add-income-title">{t('income.addIncome')}</h1>
          <p className="add-income-subtitle">{t('income.addIncomeDescription')}</p>
        </div>

        <form className="add-income-form" onSubmit={handleSubmit}>
          <div className="add-income-form-group">
            <div className="add-income-form-label">{t('income.title')}</div>
            <input
              type="text"
              className="add-income-form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('income.titlePlaceholder')}
              required
            />
          </div>

          <div className="add-income-form-group">
            <div className="add-income-form-label">{t('income.amount')}</div>
            <input
              type="number"
              className="add-income-form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('income.amountPlaceholder')}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="add-income-form-group">
            <div className="add-income-form-label">{t('income.category')}</div>
            <CategorySelect
              value={category}
              onChange={setCategory}
              required
            />
          </div>

          <div className="add-income-form-group">
            <div className="add-income-form-label">{t('income.date')}</div>
            <input
              type="date"
              className="add-income-form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="add-income-form-group">
            <div className="add-income-form-label">{t('income.description')}</div>
            <textarea
              className="add-income-form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('income.descriptionPlaceholder')}
              rows={4}
            />
          </div>

          <div className="add-income-form-group">
            <div className="add-income-form-label">{t('income.attachments')}</div>
            <FileUpload
              onChange={setFiles}
              maxSize={5 * 1024 * 1024} // 5MB
              maxFiles={5}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            />
          </div>

          <div className="add-income-form-actions">
            <button
              type="button"
              className="add-income-cancel-button"
              onClick={() => navigate('/income')}
            >
              {t('common.cancel')}
            </button>
            <button type="submit" className="add-income-submit-button">
              {t('income.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;