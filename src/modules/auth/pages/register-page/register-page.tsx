import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import "./register-page.css";
import { useRegisterForm } from "../../hooks/use-register-form";
import {
  RegisterError,
  RegisterErrorTypeEnum,
} from "../../data/errors/register-error";
import { registerWithEmail } from "../../usecases/register-with-email-usecase";
import { LOGIN_ROUTE_PATH, VERIFY_EMAIL_ROUTE_PATH } from "../../routes";
import SectionContainer from "../../../../common/components/section-container/section-container";
import AppFormButton from "../../../../common/components/app-form-button/app-form-button";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import AuthPasswordInput from "../../components/auth-password-input/auth-password-input";
import AppErrorText from "../../../../common/components/app-error-text/app-error-text";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Form hooks
  const [
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    isFormValid,
  ] = useRegisterForm();

  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    registerWithEmail(email, password).then((result) => {
      result.fold(
        (error: RegisterError) => {
          if (error.type === RegisterErrorTypeEnum.WEAK_PASSWORD_ERROR) {
            setFormError(t("auth.weakPasswordError"));
          } else {
            setFormError(t("common.genericError"));
          }
        },
        () => {
          navigate(VERIFY_EMAIL_ROUTE_PATH);
        }
      );
    });
  };

  return (
    <SectionContainer>
      {/* Header Part */}
      <div className="register-page-header">
        <h1>{t("auth.registerTitle")}</h1>
        <p>{t("auth.createAccountSubTitle")}</p>
      </div>
      {/* Form Part */}
      <form className="register-page-form" onSubmit={handleSubmit}>
        {/* Email Part */}
        <div className="register-page-form-group">
          <label className="register-page-label" htmlFor="register-email">
            {t("auth.email")}
          </label>
          <AppTextInput
            id="register-email"
            text={email}
            onTextChange={handleEmailChange}
            errorText={emailError}
            placeholder={t("auth.emailPlaceholder")}
          />
        </div>

        {/* Password Part */}
        <div className="register-page-form-group">
          <label className="register-page-label" htmlFor="register-password">
            {t("auth.password")}
          </label>
          <AuthPasswordInput
            id="register-password"
            text={password}
            onTextChange={handlePasswordChange}
            errorText={passwordError}
          />
        </div>

        {/* Password Confirmation Part */}
        <div className="register-page-form-group">
          <label
            className="register-page-label"
            htmlFor="register-confirm-password"
          >
            {t("auth.confirmPassword")}
          </label>
          <AuthPasswordInput
            id="register-confirm-password"
            text={confirmPassword}
            onTextChange={(e) => handleConfirmPasswordChange(password, e)}
            errorText={confirmPasswordError}
          />
        </div>

        <AppErrorText text={formError} />

        <AppFormButton text={t("auth.registerTitle")} />
      </form>
      <div className="register-page-footer">
        {t("auth.haveAccount")}{" "}
        <Link to={LOGIN_ROUTE_PATH}>{t("auth.loginRedirect")}</Link>
      </div>
    </SectionContainer>
  );
};

export default RegisterPage;
