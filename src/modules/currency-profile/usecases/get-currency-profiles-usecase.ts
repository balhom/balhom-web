import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const getCurrencyProfiles = async (): Promise<
  Either<AppError, CurrencyProfileEntity[]>
> => {
  return currencyProfileRepositoryInstance.list();
};
