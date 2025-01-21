import "./currency-profile-picker.css";
import { useState } from "react";
import { CurrencyProfileEntity } from "../../data/entities/currency-profile-entity";
import { CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT } from "../../data/constants/currency-profile-constants";
import { formatCurrency } from "../../utils";
import CurrencyProfilePickerDialog from "../currency-profile-dialog/currency-profile-picker-dialog";

interface Props {
  currencyProfile: CurrencyProfileEntity;
  onCurrencyProfileChange: (newCurrencyProfile: CurrencyProfileEntity) => void;
  availableCurrencyProfiles: CurrencyProfileEntity[];
}

const CurrencyProfilePicker: React.FC<Props> = ({
  currencyProfile,
  onCurrencyProfileChange,
  availableCurrencyProfiles,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        className="currency-profile-picker"
        onClick={() => setIsDialogOpen(true)}
      >
        <img
          src={
            currencyProfile.imageUrl ?? CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT
          }
          alt={currencyProfile.name}
          className="currency-profile-picker-image"
        />
        <div className="currency-profile-picker-info">
          <span className="currency-profile-picker-name">
            {currencyProfile.name}
          </span>
          <span className="currency-profile-picker-amount">
            {formatCurrency(
              currencyProfile.balance ?? 0,
              currencyProfile.currency
            )}
          </span>
        </div>
      </div>

      <CurrencyProfilePickerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currencyProfiles={availableCurrencyProfiles}
        selectedCurrencyProfile={currencyProfile}
        onSelectCurrencyProfile={onCurrencyProfileChange}
      />
    </>
  );
};

export default CurrencyProfilePicker;
