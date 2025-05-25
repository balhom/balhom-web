import { CurrencyEnum } from "../data/enums/currency-enum";
import { useCurrencyProfileCurrencyForm } from "./use-currency-profile-currency-form";
import { useCurrencyProfileNameForm } from "./use-currency-profile-name-form";

// TODO add balance, inital date, monthly savings goal, yearly savings goal
export const useCurrencyProfileForm = (): [
  string,
  CurrencyEnum | undefined,
  string,
  string,
  (newName: string) => void,
  (newCurrency: CurrencyEnum | undefined) => void,
  () => boolean
] => {
  const [name, nameError, handleNameChange, isNameValid] =
    useCurrencyProfileNameForm();
  const [currency, currencyError, handleCurrencyChange, isCurrencyValid] =
    useCurrencyProfileCurrencyForm();

  const isFormValid: () => boolean = () => {
    // Check if name is valid
    if (!isNameValid() && !nameError) {
      handleNameChange(name);
    }
    // Check if currency is valid
    if (!isCurrencyValid() && !currencyError) {
      handleCurrencyChange(currency);
    }
    if (!isNameValid() || !isCurrencyValid()) {
      return false;
    }
    return true;
  };

  return [
    name,
    currency,
    nameError,
    currencyError,
    handleNameChange,
    handleCurrencyChange,
    isFormValid,
  ];
};
