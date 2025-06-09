import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "../data/enums/currency-enum";

export const useCurrencyProfileCurrencyForm = (): [
  CurrencyEnum | undefined,
  string,
  (newCurrency?: CurrencyEnum) => void,
  () => boolean
] => {
  const { t } = useTranslation();

  const [currency, setCurrency] = useState<CurrencyEnum | undefined>();
  const [currencyError, setCurrencyError] = useState<string>("");

  const handleCurrencyChange: (newCurrency?: CurrencyEnum) => void =
    useCallback(
      (newCurrency) => {
        setCurrency(newCurrency);

        if (!newCurrency) {
          setCurrencyError(t("currencyProfile.currencyRequiredError"));
          return;
        }
        setCurrencyError("");
      },
      [t]
    );

  const isCurrencyValid: () => boolean = () => {
    if (!currency) {
      return false;
    }
    return true;
  };

  return [currency, currencyError, handleCurrencyChange, isCurrencyValid];
};
