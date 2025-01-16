import { useTranslation } from 'react-i18next';
import './number-input.css';

interface NumberInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  required?: boolean;
  placeholder?: string;
  currency?: string;
}

const NumberInput = ({
  id,
  value,
  onChange,
  label,
  min = 0,
  max = 1000000,
  required = false,
  placeholder,
  currency
}: NumberInputProps) => {
  const { t } = useTranslation();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      // Round to 2 decimal places
      onChange(Math.round(newValue * 100) / 100);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="number-input-wrapper">
        <input
          id={id}
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step="0.01"
          required={required}
          placeholder={placeholder}
        />
        {currency && <span className="currency-symbol">{currency}</span>}
      </div>
    </div>
  );
};

export default NumberInput;