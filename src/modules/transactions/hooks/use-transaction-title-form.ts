import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useTransactionTitleForm = (): [
  string,
  string,
  (newTitle: string) => void,
  () => boolean
] => {
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");

  const handleTitleChange: (newTitle: string) => void = useCallback(
    (newTitle) => {
      setTitle(newTitle);

      if (!newTitle.trim()) {
        setTitleError(t("transaction.titleRequiredError"));
        return;
      }
      setTitleError("");
    },
    [t]
  );

  const isNameValid: () => boolean = useCallback(() => {
    if (!title.trim()) {
      return false;
    }
    return true;
  }, [title]);

  return [title, titleError, handleTitleChange, isNameValid];
};
