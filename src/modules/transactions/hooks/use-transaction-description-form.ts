import { useState } from "react";

export const useTransactionDescriptionForm = (): [
  string,
  string,
  (newDescription: string) => void,
  () => boolean
] => {
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const handleDescriptionChange: (newDescription: string) => void = (
    newDescription
  ) => {
    setDescription(newDescription);

    setDescriptionError("");
  };

  const isDescriptionValid: () => boolean = () => {
    return true;
  };

  return [
    description,
    descriptionError,
    handleDescriptionChange,
    isDescriptionValid,
  ];
};
