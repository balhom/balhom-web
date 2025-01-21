import { SELECTED_CURRENCY_PROFILE_KEY } from "../data/constants/currency-profile-constants";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";

export const setSelectedCurrencyProfile = (
  selectedCurrencyProfile: CurrencyProfileEntity
): void => {
  localStorage.setItem(
    SELECTED_CURRENCY_PROFILE_KEY,
    selectedCurrencyProfile.id
  );
};
