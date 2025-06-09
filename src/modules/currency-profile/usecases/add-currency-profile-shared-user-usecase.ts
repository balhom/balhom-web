import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileSharedUserRepositoryInstance } from "../repositories/repository-instances";
import { CurrencyProfileSharedUserEntity } from "../data/entities/currency-profile-shared-user-entity";

export const addCurrencyProfileSharedUser = async (
  currencyProfileId: string,
  email: string
): Promise<Either<AppError, CurrencyProfileSharedUserEntity>> => {
  return currencyProfileSharedUserRepositoryInstance.create({
    currencyProfileId: currencyProfileId,
    email: email,
  });
};
