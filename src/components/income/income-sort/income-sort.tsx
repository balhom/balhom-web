import { useTranslation } from 'react-i18next';
import { ArrowUpDown } from 'lucide-react';
import './income-sort.css';

interface IncomeSortProps {
  value: string;
  onChange: (value: string) => void;
}

const IncomeSort = ({ value, onChange }: IncomeSortProps) => {
  const { t } = useTranslation();

  return (
    <div className="income-sort">
      <ArrowUpDown size={20} className="sort-icon" />
      <select
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="date-desc">{t('income.sortDateDesc')}</option>
        <option value="date-asc">{t('income.sortDateAsc')}</option>
        <option value="amount-desc">{t('income.sortAmountDesc')}</option>
        <option value="amount-asc">{t('income.sortAmountAsc')}</option>
        <option value="title-asc">{t('income.sortTitleAsc')}</option>
        <option value="title-desc">{t('income.sortTitleDesc')}</option>
      </select>
    </div>
  );
};

export default IncomeSort;