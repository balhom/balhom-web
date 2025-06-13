import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const deleteCurrencyProfile = async (id: string): Promise<void> => {
  await currencyProfileRepositoryInstance.delete(id);
};
