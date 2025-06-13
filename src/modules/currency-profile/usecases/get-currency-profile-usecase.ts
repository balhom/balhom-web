import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const getCurrencyProfile = async (
  id: string
): Promise<CurrencyProfileEntity> => {
  return currencyProfileRepositoryInstance.get(id);
};
