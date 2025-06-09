import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileSharedUserRepositoryInstance } from "../repositories/repository-instances";
import { CurrencyProfileSharedUserEntity } from "../data/entities/currency-profile-shared-user-entity";

export const listCurrencyProfileSharedUsers = async (
  currencyProfileId: string
): Promise<Either<AppError, CurrencyProfileSharedUserEntity[]>> => {
  return currencyProfileSharedUserRepositoryInstance.list(currencyProfileId);
};
