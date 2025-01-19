import "./app-number-input.css";

interface Props {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const AppNumberInput: React.FC<Props> = ({
  id,
  value,
  onChange,
  min = 0,
  max = 1000000,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      // Round to 2 decimal places
      onChange(Math.round(newValue * 100) / 100);
    }
  };

  return (
    <div className="app-number-input-wrapper">
      <input
        id={id}
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step="0.01"
      />
    </div>
  );
};

export default AppNumberInput;
