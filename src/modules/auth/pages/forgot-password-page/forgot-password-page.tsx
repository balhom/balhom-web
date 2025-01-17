import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./forgot-password-page.css";
import SectionContainer from "../../../../common/components/section-container/section-container";
import { LOGIN_ROUTE_PATH } from "../../routes";
import AuthFormButton from "../../components/auth-form-button/auth-form-button";
import { useEmailForm } from "../../hooks/use-email-form";
import AuthTextInput from "../../components/auth-text-input/auth-text-input";

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  const [email, emailError, handleEmailChange, isEmailValid] = useEmailForm();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleEmailChange(email);

    if (!isEmailValid()) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SectionContainer>
        {/* Header Part */}
        <div className="forgot-password-page-header">
          <h1>{t("auth.checkEmail")}</h1>
          <p>{t("auth.resetInstructions")}</p>
        </div>
        <div className="forgot-password-page-footer">
          <Link to={LOGIN_ROUTE_PATH}>{t("auth.backToSignInRedirect")}</Link>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <div className="forgot-password-page-header">
        <h1>{t("auth.forgotPassword")}</h1>
        <p>{t("auth.enterEmail")}</p>
      </div>
      <form className="forgot-password-page-form" onSubmit={handleSubmit}>
        <div className="forgot-password-page-form-group">
          <label
            className="forgot-password-page-label"
            htmlFor="forgot-password-email"
          >
            {t("auth.email")}
          </label>

          <AuthTextInput
            id="forgot-password-email"
            text={email}
            onTextChange={handleEmailChange}
            errorText={emailError}
            placeholder={t("auth.emailPlaceholder")}
          />
        </div>

        <AuthFormButton text={t("auth.resetPassword")} />
      </form>
      <div className="forgot-password-page-footer">
        <Link to={LOGIN_ROUTE_PATH}>{t("auth.backToSignInRedirect")}</Link>
      </div>
    </SectionContainer>
  );
};

export default ForgotPasswordPage;
