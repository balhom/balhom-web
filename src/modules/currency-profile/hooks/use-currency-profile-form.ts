import { useState } from "react";
import { CurrencyEnum } from "../data/enums/currency-enum";
import { useCurrencyProfileCurrencyForm } from "./use-currency-profile-currency-form";
import { useCurrencyProfileNameForm } from "./use-currency-profile-name-form";

export const useCurrencyProfileForm = (): [
  string,
  CurrencyEnum | undefined,
  string,
  Date,
  string,
  string,
  File | undefined,
  string,
  string,
  (newName: string) => void,
  (newCurrency: CurrencyEnum | undefined) => void,
  (newBalance: string) => void,
  (newInitialDate: Date) => void,
  (newMonthlySavingsGoal: string) => void,
  (newYearlySavingsGoal: string) => void,
  (newImage: File) => void,
  () => boolean
] => {
  const [name, nameError, handleNameChange, isNameValid] =
    useCurrencyProfileNameForm();
  const [currency, currencyError, handleCurrencyChange, isCurrencyValid] =
    useCurrencyProfileCurrencyForm();
  const [balance, setBalance] = useState<string>("0");
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState<string>("0");
  const [yearlySavingsGoal, setYearlySavingsGoal] = useState<string>("0");
  const [image, setImage] = useState<File | undefined>(undefined);

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
    balance,
    initialDate,
    monthlySavingsGoal,
    yearlySavingsGoal,
    image,
    nameError,
    currencyError,
    handleNameChange,
    handleCurrencyChange,
    setBalance,
    setInitialDate,
    setMonthlySavingsGoal,
    setYearlySavingsGoal,
    setImage,
    isFormValid,
  ];
};
