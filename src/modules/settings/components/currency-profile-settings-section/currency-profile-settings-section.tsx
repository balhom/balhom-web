import "./currency-profile-settings-section.css";
import { useTranslation } from "react-i18next";
import { UserPlus } from "lucide-react";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";
import ImagePicker from "../../../../common/components/image-picker/image-picker";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import CurrencyPicker from "../../../currency-profile/components/currency-picker/currency-picker";
import { useEffect, useState } from "react";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import { useCurrencyProfileForm } from "../../../currency-profile/hooks/use-currency-profile-form";
import DeleteSettingsButton from "../delete-settings-button/delete-settings-button";
import AppButton from "../../../../common/components/app-button/app-button";
import DateTimePicker from "../../../../common/components/date-time-picker/date-time-picker";
import { useOidc } from "../../../../common/config/oidc";
import SharedUserCard from "../shared-user-card/shared-user-card";

const CurrencyProfileSettingsSection: React.FC = () => {
  const { t } = useTranslation();

  const { tokens } = useOidc();
  const userId = tokens?.decodedIdToken?.sub ?? "";

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const isCurrencyProfileOwner = userId === selectedCurrencyProfile?.ownerId;

  const [newSharedUserEmail, setNewSharedUserEmail] = useState("");
  const [newSharedUserEmailError, setNewSharedUserEmailError] =
    useState<string>("");

  const [isDeletingCurrencyProfile, setIsDeletingCurrencyProfile] =
    useState<boolean>(false);

  // Form hooks
  const [
    name,
    currency,
    balance,
    initialDate,
    monthlySavingsGoal,
    yearlySavingsGoal,
    image,
    nameError,
    currencyError,
    handleNameChange,
    handleCurrencyChange,
    setBalance,
    setInitialDate,
    setMonthlySavingsGoal,
    setYearlySavingsGoal,
    setImage,
    isFormValid,
  ] = useCurrencyProfileForm();

  useEffect(() => {
    if (selectedCurrencyProfile) {
      handleNameChange(selectedCurrencyProfile.name);
      handleCurrencyChange(selectedCurrencyProfile.currency);

      setBalance(selectedCurrencyProfile.balance.toString());
      setInitialDate(selectedCurrencyProfile.initialDate);
      if (selectedCurrencyProfile.monthlySavingsGoal) {
        setMonthlySavingsGoal(
          selectedCurrencyProfile.monthlySavingsGoal.toString()
        );
      }
      if (selectedCurrencyProfile.yearlySavingsGoal) {
        setYearlySavingsGoal(
          selectedCurrencyProfile.yearlySavingsGoal.toString()
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyProfile]);

  const sharedUsers = ["test@test.com"];

  if (!selectedCurrencyProfile) return null;

  const handleUpdateCurrencyProfile = () => {
    // TODO Will be implemented later
    // Check isFormValid
  };

  const handleDeleteCurrencyProfile = () => {
    setIsDeletingCurrencyProfile(true);

    // TODO Will be implemented later
    console.log("Delete profile:", selectedCurrencyProfile.id);

    setIsDeletingCurrencyProfile(false);
  };

  const handleAddSharedUser = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO Validate email
    setNewSharedUserEmailError("");

    // TODO Will be implemented later
    console.log("Add user: ", newSharedUserEmail);
  };

  const handleRemoveUser = (email: string) => {
    // TODO Will be implemented later
    console.log("Remove user:", email);
  };

  return (
    <section className="currency-profile-settings-section">
      <div className="currency-profile-settings-section-header">
        <h2 className="currency-profile-settings-section-title">
          {t("settings.currencyProfile")}
        </h2>

        <p className="currency-profile-settings-section-description">
          {t("settings.currencyProfileDescription")}
        </p>
      </div>

      <div className="currency-profile-settings-section-list">
        {/* Image Part */}
        <div className="currency-profile-settings-section-item">
          <ImagePicker
            initialImageUrl={selectedCurrencyProfile.imageUrl}
            onImageChange={setImage}
          />
        </div>
        {/* Name Part */}
        <div className="currency-profile-settings-section-item">
          <div className="currency-profile-settings-section-halfitem">
            <div className="currency-profile-settings-section-item-title">
              {t("currencyProfile.name")}
            </div>
          </div>

          <div className="currency-profile-settings-section-halfitem">
            <AppTextInput
              id="currency-profile-name"
              text={name}
              onTextChange={handleNameChange}
              errorText={nameError}
              maxLength={15}
            />
          </div>
        </div>
        {/* Currency Part */}
        <div className="currency-profile-settings-section-item">
          <div className="currency-profile-settings-section-item-title">
            {t("currencyProfile.currency")}
          </div>

          <CurrencyPicker
            id="currency-profile-currency"
            value={currency}
            onChange={handleCurrencyChange}
            errorText={currencyError}
          />
        </div>
        {/* Balance Part */}
        <div className="currency-profile-settings-section-item">
          <div className="currency-profile-settings-section-halfitem">
            <div className="currency-profile-settings-section-item-title">
              {t("currencyProfile.balance")}
            </div>
          </div>

          <div className="currency-profile-settings-section-halfitem">
            <AppNumberInput
              id="currency-profile-initial-balance"
              value={balance}
              onChange={setBalance}
              min={-1000000000}
            />
          </div>
        </div>

        {/* Initial Date Part */}
        <div className="currency-profile-settings-section-item">
          <div className="currency-profile-settings-section-item-title">
            {t("currencyProfile.initialDate")}
          </div>

          <div>
            <DateTimePicker
              initialDate={initialDate}
              onChange={(newDate) => setInitialDate(newDate ?? new Date())}
              maxDate={new Date()}
              showTime={false}
            />
          </div>
        </div>
        {/* Monthly Savings Part */}
        <div className="currency-profile-settings-section-item">
          <div className="currency-profile-settings-section-halfitem">
            <div className="currency-profile-settings-section-item-title">
              {t("currencyProfile.monthlySavingsGoal")}
            </div>
          </div>

          <div className="currency-profile-settings-section-halfitem">
            <AppNumberInput
              id="currency-profile-monthly-savings"
              value={monthlySavingsGoal}
              onChange={setMonthlySavingsGoal}
            />
          </div>
        </div>
        {/* Yearly Savings Part */}
        <div className="currency-profile-settings-section-item">
          <div className="currency-profile-settings-section-halfitem">
            <div className="currency-profile-settings-section-item-title">
              {t("currencyProfile.yearlySavingsGoal")}
            </div>
          </div>

          <div className="currency-profile-settings-section-halfitem">
            <AppNumberInput
              id="currency-profile-yearly-savings"
              value={yearlySavingsGoal}
              onChange={setYearlySavingsGoal}
            />
          </div>
        </div>
        <AppButton
          text={t("settings.updateCurrencyProfileButton")}
          onClick={handleUpdateCurrencyProfile}
        />
        {isCurrencyProfileOwner && (
          <>
            <hr className="currency-profile-settings-section-divider" />

            {/* Shared Users Part */}
            <div>
              <div className="currency-profile-settings-section-item">
                <div>
                  <div className="currency-profile-settings-item-title">
                    {t("settings.sharedUsers")}
                  </div>

                  <div className="currency-profile-settings-item-description">
                    {t("settings.sharedUsersDescription")}
                  </div>
                </div>
              </div>

              <div>
                <div className="currency-profile-settings-section-shared-user-list">
                  {sharedUsers.map((email) => (
                    <SharedUserCard
                      key={email}
                      email={email}
                      handleRemoveUser={handleRemoveUser}
                    />
                  ))}
                </div>

                <form
                  className="currency-profile-settings-section-add-user-form"
                  onSubmit={handleAddSharedUser}
                >
                  <AppTextInput
                    id="user-email"
                    text={newSharedUserEmail}
                    onTextChange={setNewSharedUserEmail}
                    errorText={newSharedUserEmailError}
                    placeholder={t("settings.addUserPlaceholder")}
                  />

                  <button
                    type="submit"
                    className="currency-profile-settings-section-add-user-button"
                  >
                    <UserPlus size={20} />
                  </button>
                </form>
              </div>
            </div>

            <hr className="currency-profile-settings-section-divider" />

            {/* Delete Currency Profile Part */}
            <div className="currency-profile-settings-section-item">
              <div>
                <div className="currency-profile-settings-section-item-title">
                  {t("settings.deleteCurrencyProfile")}
                </div>

                <div className="currency-profile-settings-section-item-description">
                  {t("settings.deleteCurrencyProfileDescription")}
                </div>
              </div>

              <DeleteSettingsButton
                onClick={handleDeleteCurrencyProfile}
                isDisabled={isDeletingCurrencyProfile}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurrencyProfileSettingsSection;
