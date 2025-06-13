import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const leaveCurrencyProfile = async (id: string): Promise<void> => {
  // To leave a currency profile, we simply call delete repository method.
  // This assumes that leaving a profile is equivalent to deleting it only
  // for the shared user.
  await currencyProfileRepositoryInstance.delete(id);
};
