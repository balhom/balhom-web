import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./create-currency-profile-page.css";
import FormContainer from "../../../../common/components/form-container/form-container";
import AppErrorText from "../../../../common/components/app-error-text/app-error-text";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import AppFormButton from "../../../../common/components/app-form-button/app-form-button";
import CurrencyPicker from "../../components/currency-picker/currency-picker";
import { useCurrencyProfileForm } from "../../hooks/use-currency-profile-form";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";
import ImagePicker from "../../../../common/components/image-picker/image-picker";
import { useCurrencyProfiles } from "../../states/contexts/currency-profiles-context";
import { DASHBOARD_ROUTE_PATH } from "../../../dashboard/routes";
import DateTimePicker from "../../../../common/components/date-time-picker/date-time-picker";
import { createCurrencyProfile } from "../../usecases/create-currency-profile-usecase";

const CreateCurrencyProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { currencyProfiles, setCurrencyProfiles, setSelectedCurrencyProfile } =
    useCurrencyProfiles();

  // Form hooks
  const [
    name,
    currency,
    initialBalance,
    initialDate,
    monthlySavingsGoal,
    yearlySavingsGoal,
    image,
    nameError,
    currencyError,
    handleNameChange,
    handleCurrencyChange,
    setInitialBalance,
    setInitialDate,
    setMonthlySavingsGoal,
    setYearlySavingsGoal,
    setImage,
    isFormValid,
  ] = useCurrencyProfileForm();

  const [formError, setFormError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid()) {
        return;
      }

      try {
        const createdCurrencyProfile = await createCurrencyProfile({
          name: name,
          currency: currency!,
          balance: Number(initialBalance.replace(",", ".")),
          initialDate: initialDate,
          monthlySavingsGoal: Number(monthlySavingsGoal.replace(",", ".")),
          yearlySavingsGoal: Number(yearlySavingsGoal.replace(",", ".")),
          image: image,
        });

        // Update states
        setCurrencyProfiles([...currencyProfiles, createdCurrencyProfile]);
        setSelectedCurrencyProfile(createdCurrencyProfile);

        navigate(DASHBOARD_ROUTE_PATH);
      } catch (err) {
        console.error("Error creating currency profile:", err);
        setFormError(t("common.genericError"));
      }
    },
    [
      currency,
      currencyProfiles,
      image,
      initialBalance,
      initialDate,
      isFormValid,
      monthlySavingsGoal,
      name,
      navigate,
      setCurrencyProfiles,
      setSelectedCurrencyProfile,
      t,
      yearlySavingsGoal,
    ]
  );

  return (
    <FormContainer>
      {/* Header Part */}
      <div className="create-currency-profile-page-header">
        <h1>{t("currencyProfile.createCurrencyProfileTitle")}</h1>

        <p>{t("currencyProfile.createDescription")}</p>
      </div>

      <AppErrorText text={formError} />

      {/* Form Part */}
      <form
        className="create-currency-profile-page-form"
        onSubmit={handleSubmit}
      >
        {/* Name Part */}
        <div className="create-currency-profile-page-form-group">
          <label
            htmlFor="currency-profile-name"
            className="create-currency-profile-page-label"
          >
            {t("currencyProfile.name") + "*"}
          </label>

          <AppTextInput
            id="currency-profile-name"
            text={name}
            onTextChange={handleNameChange}
            errorText={nameError}
            maxLength={15}
          />
        </div>

        {/* Currency Part */}
        <div className="create-currency-profile-page-form-group">
          <label
            htmlFor="currency-profile-currency"
            className="create-currency-profile-page-label"
          >
            {t("currencyProfile.currency") + "*"}
          </label>
          <CurrencyPicker
            id="currency-profile-currency"
            value={currency}
            onChange={handleCurrencyChange}
            errorText={currencyError}
          />
        </div>

        {/* Initial Balance Part */}
        <div className="create-currency-profile-page-form-group">
          <label
            htmlFor="currency-profile-initial-balance"
            className="create-currency-profile-page-label"
          >
            {t("currencyProfile.initialBalance")}
          </label>
          <AppNumberInput
            id="currency-profile-initial-balance"
            value={initialBalance}
            onChange={setInitialBalance}
            min={-1000000000}
          />
        </div>

        {/* Initial Date Part */}
        <div className="create-currency-profile-page-form-group">
          <label className="create-currency-profile-page-label">
            {t("currencyProfile.initialDate")}
          </label>
          <DateTimePicker
            initialDate={initialDate}
            onChange={(newDate) => setInitialDate(newDate ?? new Date())}
            maxDate={new Date()}
            showTime={false}
          />
        </div>

        {/* Monthly Savings Part */}
        <div className="create-currency-profile-page-form-group">
          <label
            htmlFor="currency-profile-monthly-savings"
            className="create-currency-profile-page-label"
          >
            {t("currencyProfile.monthlySavingsGoal")}
          </label>
          <AppNumberInput
            id="currency-profile-monthly-savings"
            value={monthlySavingsGoal}
            onChange={setMonthlySavingsGoal}
          />
        </div>

        {/* Yearly Savings Part */}
        <div className="create-currency-profile-page-form-group">
          <label
            htmlFor="currency-profile-yearly-savings"
            className="create-currency-profile-page-label"
          >
            {t("currencyProfile.yearlySavingsGoal")}
          </label>
          <AppNumberInput
            id="currency-profile-yearly-savings"
            value={yearlySavingsGoal}
            onChange={setYearlySavingsGoal}
          />
        </div>

        {/* Image Part */}
        <div className="create-currency-profile-page-form-group">
          <label className="create-currency-profile-page-label">
            {t("common.image")}
          </label>
          <ImagePicker onImageChange={setImage} />
        </div>

        <AppFormButton text={t("currencyProfile.create")} />
      </form>
    </FormContainer>
  );
};

export default CreateCurrencyProfilePage;
