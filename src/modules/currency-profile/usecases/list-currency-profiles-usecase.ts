import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const listCurrencyProfiles = async (): Promise<
  CurrencyProfileEntity[]
> => {
  return currencyProfileRepositoryInstance.list();
};
