import { useCallback } from "react";
import { formatMonth } from "../../utils/date-utils";
import "./month-picker.css";
import { useTranslation } from "react-i18next";

interface Props {
  month: number;
  onChange: (newMonth: number) => void;
}

export const MonthPicker: React.FC<Props> = ({ month, onChange }: Props) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMonth = Number(e.target.value);
      onChange(newMonth);
    },
    [onChange]
  );

  const generateOptions = useCallback(() => {
    const options: { value: string; label: string }[] = [];

    [...Array(12)].map((_, i) => {
      const month = i + 1;
      const value = `${month}`;
      const label = formatMonth(month, t);
      options.push({ value, label });
    });

    return options;
  }, [t]);

  return (
    <select value={`${month}`} onChange={handleChange} className="month-picker">
      {generateOptions().map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
