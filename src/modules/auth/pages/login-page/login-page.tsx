import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  FORGOT_PASSWORD_ROUTE_PATH,
  REGISTER_ROUTE_PATH,
  VERIFY_EMAIL_ROUTE_PATH,
} from "../../routes";
import { LoginError, LoginErrorTypeEnum } from "../../data/errors/login-error";
import AuthPasswordInput from "../../components/auth-password-input/auth-password-input";
import SectionContainer from "../../../../common/components/section-container/section-container";
import { useLoginForm } from "../../hooks/use-login-form";
import { loginWithEmail } from "../../usecases/login-with-email-usecase";
import AuthTextInput from "../../components/auth-text-input/auth-text-input";
import AppErrorText from "../../../../common/components/app-error-text/app-error-text";
import AuthFormButton from "../../components/auth-form-button/auth-form-button";
import "./login-page.css";

export const LOGIN_REDIRECT_QUERY_PARAM = "redirect";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Form hooks
  const [
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    isFormValid,
  ] = useLoginForm();

  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    loginWithEmail(email, password).then((result) => {
      result.fold(
        (error: LoginError) => {
          if (error.type === LoginErrorTypeEnum.CREDENTIALS_ERROR) {
            setFormError(t("auth.wrongCredentialsError"));
          } else if (
            error.type === LoginErrorTypeEnum.EMAIL_NOT_VERIFIED_ERROR
          ) {
            navigate(VERIFY_EMAIL_ROUTE_PATH);
          } else {
            setFormError(t("auth.genericLoginError"));
          }
        },
        () => {
          const redirectTo = searchParams.get(LOGIN_REDIRECT_QUERY_PARAM);
          navigate(redirectTo ?? "/");
        }
      );
    });
  };

  return (
    <SectionContainer>
      {/* Header Part */}
      <div className="login-page-header">
        <h1>{t("auth.loginTitle")}</h1>
      </div>
      {/* Form Part */}
      <form className="login-page-form" onSubmit={handleSubmit}>
        <div className="login-page-form-group">
          <label className="login-page-label" htmlFor="login-email">
            {t("auth.email")}
          </label>
          <AuthTextInput
            id="login-email"
            text={email}
            onTextChange={handleEmailChange}
            errorText={emailError}
            placeholder={t("auth.emailPlaceholder")}
          />
        </div>
        <div className="login-page-form-group">
          <label className="login-page-label" htmlFor="login-password">
            {t("auth.password")}
          </label>
          <AuthPasswordInput
            id="login-password"
            text={password}
            onTextChange={handlePasswordChange}
            errorText={passwordError}
          />
          <Link
            to={FORGOT_PASSWORD_ROUTE_PATH}
            className="login-page-forgot-password-link"
          >
            {t("auth.forgotPassword")}
          </Link>
          <AppErrorText text={formError} />
        </div>

        <AuthFormButton text={t("auth.signIn")} />
      </form>
      <div className="login-page-footer">
        {t("auth.noAccount")}{" "}
        <Link to={REGISTER_ROUTE_PATH}>{t("auth.registerRedirect")}</Link>
      </div>
    </SectionContainer>
  );
};

export default LoginPage;
