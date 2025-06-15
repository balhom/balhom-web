import "./app-number-input.css";

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  isReadOnly?: boolean;
}

const AppNumberInput: React.FC<Props> = ({
  id,
  value,
  onChange,
  min = 0,
  max = 1000000000,
  isReadOnly,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    newValue = newValue.replace(".", ",");

    // Handle negative sign if acceptNegative is true
    if (min < 0) {
      // Allow only one leading '-'
      if (newValue.startsWith("-") && newValue.lastIndexOf("-") > 0) {
        return;
      }

      // If the only character is '-', update as 0 (to prevent invalid state)
      if (newValue === "-") {
        onChange("0");
        return;
      }
    } else {
      // Remove '-' if not accepting negatives
      newValue = newValue.replace("-", "");
    }

    // If the only character is 0 and a new number is typed, replace the 0
    if (newValue.length > 1 && newValue[0] === "0" && newValue[1] !== ",") {
      newValue = newValue.slice(1);
    }
    if (!newValue || newValue === ",") {
      onChange("0");
      return;
    }

    // Convert comma back to dot for parsing
    const parseValue = Number(newValue.replace(",", "."));

    const newValueParts = newValue.split(",");
    if (newValueParts.length > 1 && newValueParts[1].length > 2) {
      return;
    }

    if (
      parseValue &&
      !isNaN(parseValue) &&
      parseValue >= min &&
      parseValue <= max
    ) {
      onChange(newValue);
    }
  };

  // Format display value to use comma instead of dot
  const displayValue = value.toString().replace(".", ",");

  if (isReadOnly) {
    return (
      <div>
        <div className="app-text-input-box">
          <p>{displayValue}</p>
        </div>
      </div>
    );
  }

  return (
    <input
      id={id}
      className="app-number-input"
      type="text"
      value={displayValue}
      onChange={handleChange}
    />
  );
};

export default AppNumberInput;
