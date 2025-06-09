import { useCallback } from "react";
import "./year-picker.css";

interface Props {
  year: number;
  availableYears: number[];
  onChange: (newYear: number) => void;
}

export const YearPicker: React.FC<Props> = ({
  year,
  availableYears,
  onChange,
}: Props) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = Number(e.target.value);
      onChange(newYear);
    },
    [onChange]
  );

  const generateOptions = useCallback(() => {
    const options: { value: string; label: string }[] = [];

    availableYears
      .sort((a, b) => b - a)
      .map((_, i) => {
        const value = availableYears[i].toString();
        const label = availableYears[i].toString();
        options.push({ value, label });
      });

    return options;
  }, [availableYears]);

  return (
    <select value={`${year}`} onChange={handleChange} className="year-picker">
      {generateOptions().map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
