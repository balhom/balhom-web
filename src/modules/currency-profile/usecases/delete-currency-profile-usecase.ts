import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const deleteCurrencyProfile = async (
  id: string
): Promise<Either<AppError, void>> => {
  return currencyProfileRepositoryInstance.delete(id);
};
