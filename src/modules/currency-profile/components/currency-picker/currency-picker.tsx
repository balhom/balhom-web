import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "../../data/enums/currency-enum";
import "./currency-picker.css";
import AppErrorText from "../../../../common/components/app-error-text/app-error-text";

interface Props {
  id?: string;
  value?: CurrencyEnum;
  onChange: (value: CurrencyEnum) => void;
  errorText?: string;
  isReadOnly?: boolean;
}

const CurrencyPicker: React.FC<Props> = ({
  id,
  value,
  onChange,
  errorText,
  isReadOnly = false,
}: Props) => {
  const { t } = useTranslation();

  if (isReadOnly) {
    return (
      <div>
        <div className="currency-picker-box">
          <p>{t(`currencyProfile.${value}`)}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="currency-picker">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as CurrencyEnum)}
        >
          <option hidden>{"-"}</option>
          {Object.values(CurrencyEnum).map((availableCurrency) => (
            <option key={availableCurrency} value={availableCurrency}>
              {t(`currencyProfile.${availableCurrency}`)}
            </option>
          ))}
        </select>
      </div>

      <AppErrorText text={errorText} />
    </div>
  );
};

export default CurrencyPicker;
