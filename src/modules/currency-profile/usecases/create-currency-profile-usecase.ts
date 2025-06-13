import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";
import { CreateCurrencyProfileProps } from "../data/props/create-currency-profile-props";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";

export const createCurrencyProfile = async (
  props: CreateCurrencyProfileProps
): Promise<CurrencyProfileEntity> => {
  return currencyProfileRepositoryInstance.create(props);
};
