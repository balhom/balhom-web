import "./currency-profile-picker-dialog.css";
import { X, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";
import { formatCurrency } from "../../utils";
import { CurrencyProfileEntity } from "../../data/entities/currency-profile-entity";
import { CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT } from "../../data/constants/currency-profile-constants";
import { useNavigate } from "react-router-dom";
import { CREATE_CURRENCY_PROFILE_ROUTE_PATH } from "../../routes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currencyProfiles: CurrencyProfileEntity[];
  selectedCurrencyProfile: CurrencyProfileEntity;
  onSelectCurrencyProfile: (currencyProfile: CurrencyProfileEntity) => void;
}

const CurrencyProfilePickerDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  currencyProfiles,
  selectedCurrencyProfile,
  onSelectCurrencyProfile,
}: Props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCreateCurrencyProfile = () => {
    navigate(CREATE_CURRENCY_PROFILE_ROUTE_PATH);
  };

  if (!isOpen) return null;

  return (
    <div className="currency-profile-picker-dialog-overlay" onClick={onClose}>
      <div
        className="currency-profile-picker-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="currency-profile-picker-dialog-header">
          <h2 className="currency-profile-picker-dialog-title">
            {t("currencyProfile.selectProfile")}
          </h2>
          <button
            className="currency-profile-picker-dialog-close-button"
            onClick={onClose}
            aria-label={t("common.close")}
          >
            <X size={20} />
          </button>
        </div>
        <div className="currency-profile-picker-dialog-list">
          {currencyProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`currency-profile-picker-dialog-item ${
                profile.id === selectedCurrencyProfile.id ? "selected" : ""
              }`}
              onClick={() => {
                onSelectCurrencyProfile(profile);
                onClose();
              }}
            >
              <img
                src={
                  profile.imageUrl ?? CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT
                }
                alt={profile.name}
                className="currency-profile-picker-dialog-item-image"
              />
              <div className="currency-profile-picker-dialog-item-info">
                <div className="currency-profile-picker-dialog-item-name">
                  {profile.name}
                </div>
                <div className="currency-profile-picker-dialog-item-amount">
                  {formatCurrency(profile.balance || 0, profile.currency)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="currency-profile-picker-dialog-footer">
          <button
            className="currency-profile-picker-dialog-button"
            onClick={handleCreateCurrencyProfile}
          >
            <Plus size={18} />
            {t("currencyProfile.create")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyProfilePickerDialog;
