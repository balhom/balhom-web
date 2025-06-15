import { currencyProfileSharedUserRepositoryInstance } from "../repositories/repository-instances";
import { CurrencyProfileSharedUserEntity } from "../data/entities/currency-profile-shared-user-entity";

export const listCurrencyProfileSharedUsers = async (
  currencyProfileId: string
): Promise<CurrencyProfileSharedUserEntity[]> => {
  return currencyProfileSharedUserRepositoryInstance.list(currencyProfileId);
};
