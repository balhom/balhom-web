import "./currency-profile-settings-section.css";
import { useTranslation } from "react-i18next";
import { UserPlus } from "lucide-react";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";
import ImagePicker from "../../../../common/components/image-picker/image-picker";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import CurrencyPicker from "../../../currency-profile/components/currency-picker/currency-picker";
import { useCallback, useEffect, useState } from "react";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import { useCurrencyProfileForm } from "../../../currency-profile/hooks/use-currency-profile-form";
import DeleteSettingsButton from "../delete-settings-button/delete-settings-button";
import AppButton from "../../../../common/components/app-button/app-button";
import DateTimePicker from "../../../../common/components/date-time-picker/date-time-picker";
import { useOidc } from "../../../../common/config/oidc";
import SharedUserCard from "../shared-user-card/shared-user-card";
import { CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT } from "../../../currency-profile/data/constants/currency-profile-constants";
import { updateCurrencyProfile } from "../../../currency-profile/usecases/update-currency-profile-usecase";
import AppDeleteDialog from "../../../../common/components/app-delete-dialog/app-delete-dialog";
import { deleteCurrencyProfile } from "../../../currency-profile/usecases/delete-currency-profile-usecase";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE_PATH } from "../../../dashboard/routes";
import { CurrencyProfileSharedUserEntity } from "../../../currency-profile/data/entities/currency-profile-shared-user-entity";
import { listCurrencyProfileSharedUsers } from "../../../currency-profile/usecases/list-currency-profile-shared-users-usecase";
import { removeSharedUserFromCurrencyProfile } from "../../../currency-profile/usecases/remove-shared-user-from-currency-profile-usecase";
import { addCurrencyProfileSharedUser } from "../../../currency-profile/usecases/add-currency-profile-shared-user-usecase";
import { isEmail } from "../../../../common/utils/form-utils";
import { CREATE_CURRENCY_PROFILE_ROUTE_PATH } from "../../../currency-profile/routes";

const CurrencyProfileSettingsSection: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { tokens } = useOidc();
  const userId = tokens?.decodedIdToken?.sub ?? "";

  const {
    selectedCurrencyProfile,
    currencyProfiles,
    setSelectedCurrencyProfile,
    setCurrencyProfiles,
  } = useCurrencyProfiles();

  // State to manage the delete confirmation dialog
  const [
    isCurrencyProfileDeleteDialogOpen,
    setIsCurrencyProfileDeleteDialogOpen,
  ] = useState(false);

  // State to manage the user removal confirmation dialog
  const [isUserRemovalDialogOpen, setIsUserRemovalDialogOpen] = useState(false);

  // State to manage the email of the user to be removed
  const [sharedUserToRemove, setSharedUserToRemove] =
    useState<CurrencyProfileSharedUserEntity>();

  const isCurrencyProfileOwner = userId === selectedCurrencyProfile?.ownerId;

  // State to manage the new shared user email input
  // and its error message
  const [newSharedUserEmail, setNewSharedUserEmail] = useState("");
  const [newSharedUserEmailError, setNewSharedUserEmailError] =
    useState<string>("");

  const [isDeletingCurrencyProfile, setIsDeletingCurrencyProfile] =
    useState<boolean>(false);

  const [isAddingSharedUser, setIsAddingSharedUser] = useState<boolean>(false);

  // State to manage the list of shared users
  const [sharedUsers, setSharedUsers] = useState<
    CurrencyProfileSharedUserEntity[]
  >([]);

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

      // Set shared users for the selected currency profile
      // It fetches the shared users
      listCurrencyProfileSharedUsers(selectedCurrencyProfile.id).then(
        (result) => {
          if (result.isRight()) {
            // Set the shared users from the result
            setSharedUsers(result.getRight() ?? []);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyProfile]);

  // Function to handle the update of the currency profile
  // It checks if the form is valid before proceeding with the update
  const handleUpdateCurrencyProfile = useCallback(() => {
    if (!isFormValid()) {
      updateCurrencyProfile({
        name: name,
        balance: Number(balance),
        initialDate: initialDate,
        monthlySavingsGoal: parseFloat(monthlySavingsGoal),
        yearlySavingsGoal: parseFloat(yearlySavingsGoal),
        image: image,
      });
    }
  }, [
    balance,
    image,
    initialDate,
    isFormValid,
    monthlySavingsGoal,
    name,
    yearlySavingsGoal,
  ]);

  // Function to handle the deletion of the current currency profile
  const handleDeleteCurrencyProfile = useCallback(() => {
    if (selectedCurrencyProfile) {
      setIsDeletingCurrencyProfile(true);

      deleteCurrencyProfile(selectedCurrencyProfile.id).then(() => {
        // Remove selected currency profile from the currency profiles list
        const newCurrencyProfiles = currencyProfiles.filter(
          (profile) => profile.id !== selectedCurrencyProfile?.id
        );
        setCurrencyProfiles(newCurrencyProfiles);
        setSelectedCurrencyProfile(newCurrencyProfiles[0] ?? null);

        // If there are no currency profiles left, navigate to the create currency profile route
        // Otherwise, navigate to the dashboard route
        if (newCurrencyProfiles.length === 0) {
          navigate(CREATE_CURRENCY_PROFILE_ROUTE_PATH);
        } else {
          navigate(DASHBOARD_ROUTE_PATH);
        }

        setIsDeletingCurrencyProfile(false);
      });
    }
  }, [
    currencyProfiles,
    navigate,
    selectedCurrencyProfile,
    setCurrencyProfiles,
    setSelectedCurrencyProfile,
  ]);

  const handleAddSharedUser = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Check if the new shared user email is empty
      if (!newSharedUserEmail.trim() || !isEmail(newSharedUserEmail)) return;

      // Avoid if the selected currency profile is null
      if (!selectedCurrencyProfile) return;

      // Check if a user is already being added
      if (isAddingSharedUser) return;

      setIsAddingSharedUser(true);

      setNewSharedUserEmailError("");

      addCurrencyProfileSharedUser(
        selectedCurrencyProfile.id,
        newSharedUserEmail
      ).then((result) => {
        result.fold(
          () => {
            setNewSharedUserEmailError(t("common.genericError"));
          },
          (newSharedUser) => {
            // Add the new shared user to the shared users list
            setSharedUsers((prevUsers) => [
              ...prevUsers,
              {
                id: newSharedUser.id,
                email: newSharedUser.email,
              },
            ]);
          }
        );

        setIsAddingSharedUser(false);
      });
    },
    [isAddingSharedUser, newSharedUserEmail, selectedCurrencyProfile, t]
  );

  const handleRemoveUser = useCallback(() => {
    if (selectedCurrencyProfile && sharedUserToRemove) {
      removeSharedUserFromCurrencyProfile(
        selectedCurrencyProfile.id,
        sharedUserToRemove.id
      );

      // Remove the user from the shared users list
      setSharedUsers(
        sharedUsers.filter((email) => email !== sharedUserToRemove)
      );
    }
  }, [selectedCurrencyProfile, sharedUsers, sharedUserToRemove]);

  if (!selectedCurrencyProfile) return null;

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
            initialImageUrl={
              selectedCurrencyProfile.imageUrl ??
              CURRENCY_PROFILE_DEFAULT_IMAGE_CONSTANT
            }
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
            isReadOnly={true}
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
                  <div className="currency-profile-settings-section-item-title">
                    {t("settings.sharedUsers")}
                  </div>

                  <div className="currency-profile-settings-section-item-description">
                    {t("settings.sharedUsersDescription")}
                  </div>
                </div>
              </div>

              <div>
                <div className="currency-profile-settings-section-shared-user-list">
                  {sharedUsers.map((sharedUser) => (
                    <SharedUserCard
                      key={sharedUser.id}
                      email={sharedUser.email}
                      handleRemoveUser={() => {
                        setSharedUserToRemove(sharedUser);
                        setIsUserRemovalDialogOpen(true);
                      }}
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
                onClick={() => setIsCurrencyProfileDeleteDialogOpen(true)}
                isDisabled={isDeletingCurrencyProfile}
              />
            </div>
          </>
        )}
      </div>

      <AppDeleteDialog
        isOpen={isCurrencyProfileDeleteDialogOpen}
        onClose={() => setIsCurrencyProfileDeleteDialogOpen(false)}
        onConfirm={handleDeleteCurrencyProfile}
        message={t("settings.deleteCurrencyProfileConfirmMessage")}
      />

      <AppDeleteDialog
        isOpen={isUserRemovalDialogOpen}
        onClose={() => setIsUserRemovalDialogOpen(false)}
        onConfirm={handleRemoveUser}
        message={t("settings.userRemovalConfirmMessage")}
      />
    </section>
  );
};

export default CurrencyProfileSettingsSection;
