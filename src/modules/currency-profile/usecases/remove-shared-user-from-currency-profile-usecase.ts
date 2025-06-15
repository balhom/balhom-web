import { currencyProfileSharedUserRepositoryInstance } from "../repositories/repository-instances";

export const removeSharedUserFromCurrencyProfile = async (
  currencyProfileId: string,
  id: string
): Promise<void> => {
  await currencyProfileSharedUserRepositoryInstance.delete(
    currencyProfileId,
    id
  );
};
