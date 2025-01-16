import { useTranslation } from 'react-i18next';

interface YearSelectProps {
  value: number;
  onChange: (year: number) => void;
}

export const YearSelect = ({ value, onChange }: YearSelectProps) => {
  const { t } = useTranslation();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  const generateOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 4;

    for (let year = startYear; year <= currentYear; year++) {
      options.push(year);
    }

    return options;
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="chart-select"
    >
      {generateOptions().map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  );
};