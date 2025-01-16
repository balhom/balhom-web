import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Trash2, Calendar } from 'lucide-react';
import DatePickerDialog from './date-picker';
import './filter-dialog.css';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  minAmount: string;
  maxAmount: string;
  startDate: Date | null;
  endDate: Date | null;
  onMinAmountChange: (value: string) => void;
  onMaxAmountChange: (value: string) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const FilterDialog = ({
  isOpen,
  onClose,
  minAmount,
  maxAmount,
  startDate,
  endDate,
  onMinAmountChange,
  onMaxAmountChange,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
  onApplyFilters
}: FilterDialogProps) => {
  const { t } = useTranslation();
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  if (!isOpen) return null;

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="filter-dialog-overlay" onClick={onClose}>
      <div className="filter-dialog" onClick={e => e.stopPropagation()}>
        <div className="filter-dialog-header">
          <h2>Filters</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="filter-content">
          <div className="filter-section">
            <h3>{t('income.amountRange')}</h3>
            <div className="amount-inputs">
              <input
                type="number"
                value={minAmount}
                onChange={(e) => onMinAmountChange(e.target.value)}
                placeholder={t('income.minAmountPlaceholder')}
                className="filter-input"
              />
              <span className="amount-separator">to</span>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => onMaxAmountChange(e.target.value)}
                placeholder={t('income.maxAmountPlaceholder')}
                className="filter-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>{t('income.dateRange')}</h3>
            <div className="date-inputs">
              <div 
                className="date-picker-input" 
                onClick={() => setIsStartDatePickerOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Select start date"
              >
                <Calendar size={20} color="#64748b" />
                <span 
                  className="date-picker-value"
                  data-placeholder="Start date"
                >
                  {formatDate(startDate)}
                </span>
              </div>
              <div 
                className="date-picker-input" 
                onClick={() => setIsEndDatePickerOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Select end date"
              >
                <Calendar size={20} color="#64748b" />
                <span 
                  className="date-picker-value"
                  data-placeholder="End date"
                >
                  {formatDate(endDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button className="clear-filters-button" onClick={onClearFilters}>
            <Trash2 size={18} />
            <span>Clear filters</span>
          </button>
          <button className="apply-filters-button" onClick={() => {
            onApplyFilters();
            onClose();
          }}>
            Apply filters
          </button>
        </div>

        <DatePickerDialog
          isOpen={isStartDatePickerOpen}
          onClose={() => setIsStartDatePickerOpen(false)}
          selected={startDate}
          onChange={onStartDateChange}
          title="Select Start Date"
          maxDate={endDate || undefined}
        />

        <DatePickerDialog
          isOpen={isEndDatePickerOpen}
          onClose={() => setIsEndDatePickerOpen(false)}
          selected={endDate}
          onChange={onEndDateChange}
          title="Select End Date"
          minDate={startDate || undefined}
        />
      </div>
    </div>
  );
};

export default FilterDialog;