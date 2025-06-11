import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const leaveCurrencyProfile = async (
  id: string
): Promise<Either<AppError, void>> => {
  // To leave a currency profile, we simply call delete repository method.
  // This assumes that leaving a profile is equivalent to deleting it only
  // for the shared user.
  return currencyProfileRepositoryInstance.delete(id);
};
