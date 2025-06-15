import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";
import { CurrencyProfileChangeEventEntity } from "../data/entities/currency-profile-change-event-entity";

export const listenCurrencyProfileChanges = async (
  onChange: (event: CurrencyProfileChangeEventEntity) => void
): Promise<void> => {
  currencyProfileRepositoryInstance.listen((currencyProfileChangeEvent) => {
    onChange(currencyProfileChangeEvent);
  });
};
