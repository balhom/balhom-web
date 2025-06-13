import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const deleteAllCurrencyProfiles = async (): Promise<void> => {
  await currencyProfileRepositoryInstance.deleteAll();

  // Clear all keys from local storage
  localStorage.clear();
};
