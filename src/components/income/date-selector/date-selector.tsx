import { useTranslation } from 'react-i18next';
import RefreshButton from '../../common/refresh-button/refresh-button';
import './date-selector.css';

interface DateSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onRefresh: () => void;
}

const DateSelector = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onRefresh
}: DateSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="date-selector-container">
      <div className="date-selector">
        <select
          className="date-select"
          value={selectedMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {t(`months.${new Date(2024, i).toLocaleString('default', { month: 'long' }).toLowerCase()}`)}
            </option>
          ))}
        </select>
        <select
          className="date-select"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <RefreshButton onClick={onRefresh} />
    </div>
  );
};

export default DateSelector;