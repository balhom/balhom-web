import { useCallback } from "react";
import { useTransactionDescriptionForm } from "./use-transaction-description-form";
import { useTransactionTitleForm } from "./use-transaction-title-form";

export const useTransactionForm = (): [
  string,
  string,
  string,
  string,
  (newTitle: string) => void,
  (newDescription: string) => void,
  () => boolean
] => {
  const [title, titleError, handleTitleChange, isTitleValid] =
    useTransactionTitleForm();
  const [
    description,
    descriptionError,
    handleDescriptionChange,
    isDescriptionValid,
  ] = useTransactionDescriptionForm();

  const isFormValid: () => boolean = useCallback(() => {
    // Check if title is valid
    if (!isTitleValid() && !titleError) {
      handleTitleChange(title);
    }
    // Check if description is valid
    if (!isDescriptionValid() && !descriptionError) {
      handleDescriptionChange(description);
    }

    if (!isTitleValid() || !isDescriptionValid()) {
      return false;
    }
    return true;
  }, [
    description,
    descriptionError,
    handleDescriptionChange,
    handleTitleChange,
    isDescriptionValid,
    isTitleValid,
    title,
    titleError,
  ]);

  return [
    title,
    description,
    titleError,
    descriptionError,
    handleTitleChange,
    handleDescriptionChange,
    isFormValid,
  ];
};
