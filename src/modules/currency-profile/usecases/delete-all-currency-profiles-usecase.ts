import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const deleteAllCurrencyProfiles = async (): Promise<
  Either<AppError, void>
> => {
  return (await currencyProfileRepositoryInstance.deleteAll()).fold(
    (error: AppError) => {
      return Either.left(error);
    },
    () => {
      // Clear all keys from local storage
      localStorage.clear();
      return Either.right(undefined);
    }
  );
};
