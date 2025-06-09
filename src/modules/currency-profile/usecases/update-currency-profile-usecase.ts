import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { UpdateCurrencyProfileProps } from "../data/props/update-currency-profile-props";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const updateCurrencyProfile = async (
  props: UpdateCurrencyProfileProps
): Promise<Either<AppError, void>> => {
  return await currencyProfileRepositoryInstance.update(props);
};
