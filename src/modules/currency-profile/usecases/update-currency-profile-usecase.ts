import { UpdateCurrencyProfileProps } from "../data/props/update-currency-profile-props";
import { currencyProfileRepositoryInstance } from "../repositories/repository-instances";

export const updateCurrencyProfile = async (
  props: UpdateCurrencyProfileProps
): Promise<void> => {
  return await currencyProfileRepositoryInstance.update(props);
};
