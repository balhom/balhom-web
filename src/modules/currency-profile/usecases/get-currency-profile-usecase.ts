import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const getCurrencyProfile = async (
  id: string
): Promise<Either<AppError, CurrencyProfileEntity>> => {
  return currencyProfileRepositoryInstance.get(id);
};
