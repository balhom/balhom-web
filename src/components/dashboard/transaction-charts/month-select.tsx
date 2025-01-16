import { useTranslation } from 'react-i18next';

interface MonthSelectProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const MonthSelect = ({ value, onChange }: MonthSelectProps) => {
  const { t } = useTranslation();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [year, month] = e.target.value.split('-').map(Number);
    const newDate = new Date(year, month);
    onChange(newDate);
  };

  const generateOptions = () => {
    const options = [];
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());

    for (let date = startDate; date <= currentDate; date.setMonth(date.getMonth() + 1)) {
      const value = `${date.getFullYear()}-${date.getMonth()}`;
      const label = `${t(`months.${date.toLocaleString('default', { month: 'short' }).toLowerCase()}`)} ${date.getFullYear()}`;
      options.push({ value, label });
    }

    return options;
  };

  return (
    <select
      value={`${value.getFullYear()}-${value.getMonth()}`}
      onChange={handleChange}
      className="chart-select"
    >
      {generateOptions().map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
};