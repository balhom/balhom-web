import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";
import { CreateCurrencyProfileProps } from "../data/props/create-currency-profile-props";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";

export const createCurrencyProfile = async (
  props: CreateCurrencyProfileProps
): Promise<Either<AppError, CurrencyProfileEntity>> => {
  return currencyProfileRepositoryInstance.create(props);
};
