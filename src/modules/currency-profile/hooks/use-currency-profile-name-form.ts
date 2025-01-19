import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isValidGenericName } from "../../../common/utils/form-utils";

export const useCurrencyProfileNameForm = (): [
  string,
  string,
  (newName: string) => void,
  () => boolean
] => {
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const handleNameChange: (newName: string) => void = (newName) => {
    setName(newName);

    if (!newName.trim()) {
      setNameError(t("currencyProfile.nameRequiredError"));
      return;
    } else if (!isValidGenericName(newName)) {
      setNameError(t("currencyProfile.nameInvalidError"));
      return;
    }
    setNameError("");
  };

  const isNameValid: () => boolean = () => {
    if (!name.trim()) {
      return false;
    } else if (!isValidGenericName(name)) {
      return false;
    }
    return true;
  };

  return [name, nameError, handleNameChange, isNameValid];
};
