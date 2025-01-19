import React from "react";
import "./app-error-page.css";
import { useTranslation } from "react-i18next";
import AppButton from "../../components/app-button/app-button";

interface Props {
  title: string;
  message?: string;
  showHomeBtn?: boolean;
}

const AppErrorPage: React.FC<Props> = ({ title, message, showHomeBtn }) => {
  const { t } = useTranslation();

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="app-error-page-container">
      <h2 className="app-error-page-title">{title}</h2>
      {message && <p className="app-error-page-text">{message}</p>}
      {showHomeBtn && (
        <AppButton text={t("common.goToHome")} onClick={handleGoHome} />
      )}
    </div>
  );
};

export default AppErrorPage;
