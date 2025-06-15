import { currencyProfileSharedUserRepositoryInstance } from "../repositories/repository-instances";

export const addCurrencyProfileSharedUser = async (
  currencyProfileId: string,
  email: string
): Promise<void> => {
  await currencyProfileSharedUserRepositoryInstance.create({
    currencyProfileId: currencyProfileId,
    email: email,
  });
};
