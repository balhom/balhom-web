import { useTranslation } from 'react-i18next';
import type { Currency } from '../../../types/currency-profile';
import './currency-select.css';

interface CurrencySelectProps {
  value: Currency;
  onChange: (value: Currency) => void;
  required?: boolean;
}

const CURRENCIES: Currency[] = ['EUR', 'USD', 'CAD'];

const CurrencySelect = ({
  value,
  onChange,
  required = false,
}: CurrencySelectProps) => {
  const { t } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor="currency">{t('currencyProfile.currency')}</label>
      <div className="currency-select">
        <select
          id="currency"
          value={value}
          onChange={(e) => onChange(e.target.value as Currency)}
          required={required}
        >
          {CURRENCIES.map((curr) => (
            <option key={curr} value={curr}>
              {t(`currencyProfile.${curr}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencySelect;
