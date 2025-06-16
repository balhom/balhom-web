import "./currency-profile-picker.css";
import { useState } from "react";
import { CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT } from "../../data/constants/currency-profile-constants";
import { formatAmountAndCurrency } from "../../utils";
import CurrencyProfilePickerDialog from "../currency-profile-dialog/currency-profile-picker-dialog";
import { useCurrencyProfiles } from "../../states/contexts/currency-profiles-context";

const CurrencyProfilePicker: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    selectedCurrencyProfile,
    currencyProfiles,
    setSelectedCurrencyProfile,
  } = useCurrencyProfiles();

  if (!selectedCurrencyProfile) {
    return null;
  }

  return (
    <>
      <div
        className="currency-profile-picker"
        onClick={() => setIsDialogOpen(true)}
      >
        <img
          src={
            selectedCurrencyProfile.imageUrl ??
            CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT
          }
          alt={selectedCurrencyProfile.name}
          className="currency-profile-picker-image"
        />
        <div className="currency-profile-picker-info">
          <span className="currency-profile-picker-name">
            {selectedCurrencyProfile.name}
          </span>
          <span className="currency-profile-picker-amount">
            {formatAmountAndCurrency(
              selectedCurrencyProfile.balance ?? 0,
              selectedCurrencyProfile.currency
            )}
          </span>
        </div>
      </div>

      <CurrencyProfilePickerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currencyProfiles={currencyProfiles}
        selectedCurrencyProfile={selectedCurrencyProfile}
        onSelectCurrencyProfile={setSelectedCurrencyProfile}
      />
    </>
  );
};

export default CurrencyProfilePicker;
