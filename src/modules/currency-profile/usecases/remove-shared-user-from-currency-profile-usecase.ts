import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileSharedUserRepositoryInstance } from "../repositories/repository-instances";

export const removeSharedUserFromCurrencyProfile = async (
  currencyProfileId: string,
  id: string
): Promise<Either<AppError, void>> => {
  return currencyProfileSharedUserRepositoryInstance.delete(
    currencyProfileId,
    id
  );
};
