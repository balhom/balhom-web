import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./create-currency-profile-page.css";
import SectionContainer from "../../../../common/components/section-container/section-container";
import AppErrorText from "../../../../common/components/app-error-text/app-error-text";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import AppFormButton from "../../../../common/components/app-form-button/app-form-button";
import CurrencyPicker from "../../components/currency-picker/currency-picker";
import { useCurrencyProfileForm } from "../../hooks/use-currency-profile-form";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";
import ImagePicker from "../../../../common/components/image-picker/image-picker";
import { useCurrencyProfiles } from "../../states/contexts/currency-profiles-context";
import { CurrencyProfileEntity } from "../../data/entities/currency-profile-entity";

const CreateCurrencyProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { currencyProfiles, setCurrencyProfiles, setSelectedCurrencyProfile } =
    useCurrencyProfiles();

  // Form hooks
  const [
    name,
    currency,
    nameError,
    currencyError,
    handleNameChange,
    handleCurrencyChange,
    isFormValid,
  ] = useCurrencyProfileForm();

  const [initialBalance, setInitialBalance] = useState<string>("0");
  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState<string>("0");
  const [yearlySavingsGoal, setYearlySavingsGoal] = useState<string>("0");
  const [image, setImage] = useState<File | undefined>(undefined);

  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      // Mock saving profile
      console.log("Creating currency profile:", {
        name,
        currency,
        image,
        monthlySavingsGoal,
        yearlySavingsGoal,
      });

      // TODO call create usecase
      const createdCurrencyProfile: CurrencyProfileEntity = {
        id: "12345678",
        name: name,
        currency: currency!,
        balance: Number(initialBalance),
        monthlySavingsGoal: Number(monthlySavingsGoal),
        yearlySavingsGoal: Number(yearlySavingsGoal),
      };

      // Update states
      setCurrencyProfiles([...currencyProfiles, createdCurrencyProfile]);
      setSelectedCurrencyProfile(createdCurrencyProfile);

      navigate("/");
    } catch (err) {
      setFormError(t("common.genericError"));
      console.error("Error creating currency profile:", err);
    }
  };

  return (
    <SectionContainer>
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
            placeholder={t("currencyProfile.namePlaceholder")}
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
    </SectionContainer>
  );
};

export default CreateCurrencyProfilePage;
