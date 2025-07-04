import { SELECTED_CURRENCY_PROFILE_KEY } from "../data/constants/currency-profile-constants";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";

export const getSelectedCurrencyProfile = (
  availableCurrencyProfiles: CurrencyProfileEntity[]
): CurrencyProfileEntity | null => {
  if (!availableCurrencyProfiles) {
    return null;
  }

  try {
    const selectedCurrencyProfileId = localStorage.getItem(
      SELECTED_CURRENCY_PROFILE_KEY
    );

    // If no currency profile has been selected, the first available one is used
    if (!selectedCurrencyProfileId) {
      localStorage.setItem(
        SELECTED_CURRENCY_PROFILE_KEY,
        availableCurrencyProfiles[0].id
      );
      return availableCurrencyProfiles[0];
    }

    const selectedCurrencyProfile = availableCurrencyProfiles.find(
      (currencyProfile) => {
        return currencyProfile.id == selectedCurrencyProfileId;
      }
    );

    // If the selected currency profile does not exist, the first available one is used
    if (!selectedCurrencyProfile) {
      localStorage.setItem(
        SELECTED_CURRENCY_PROFILE_KEY,
        availableCurrencyProfiles[0].id
      );
      return availableCurrencyProfiles[0];
    }

    return selectedCurrencyProfile;
  } catch {
    return null;
  }
};
