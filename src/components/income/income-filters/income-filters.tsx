import { useTranslation } from 'react-i18next';
import './income-filters.css';

interface IncomeFiltersProps {
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
  onMinAmountChange: (value: string) => void;
  onMaxAmountChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const IncomeFilters = ({
  minAmount,
  maxAmount,
  startDate,
  endDate,
  onMinAmountChange,
  onMaxAmountChange,
  onStartDateChange,
  onEndDateChange
}: IncomeFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="income-filters">
      <div className="filters-grid">
        <div className="filter-group">
          <label>{t('income.amountRange')}</label>
          <input
            type="number"
            className="filter-input"
            value={minAmount}
            onChange={(e) => onMinAmountChange(e.target.value)}
            placeholder={t('income.minAmountPlaceholder')}
          />
          <input
            type="number"
            className="filter-input"
            value={maxAmount}
            onChange={(e) => onMaxAmountChange(e.target.value)}
            placeholder={t('income.maxAmountPlaceholder')}
          />
        </div>
        <div className="filter-group">
          <label>{t('income.dateRange')}</label>
          <div className="date-range">
            <input
              type="date"
              className="filter-input"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
            />
            <input
              type="date"
              className="filter-input"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeFilters;