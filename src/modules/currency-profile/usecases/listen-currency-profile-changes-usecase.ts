import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";
import { CurrencyProfileChangeEventEntity } from "../data/entities/currency-profile-change-event-entity";

export const listenCurrencyProfileChanges = async (
  onChange: (event: CurrencyProfileChangeEventEntity) => void
): Promise<Either<AppError, void>> => {
  return currencyProfileRepositoryInstance.listen(
    (currencyProfileChangeEvent) => {
      onChange(currencyProfileChangeEvent);
    }
  );
};
