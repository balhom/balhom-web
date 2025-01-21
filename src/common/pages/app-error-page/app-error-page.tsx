import React from "react";
import "./app-error-page.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  message?: string;
  showHomeBtn?: boolean;
}

const AppErrorPage: React.FC<Props> = ({ title, message, showHomeBtn }) => {
  const { t } = useTranslation();

  return (
    <div className="app-error-page-container">
      <h2 className="app-error-page-title">{title}</h2>
      {message && <p className="app-error-page-text">{message}</p>}
      {showHomeBtn && (
        <Link to="/" className="app-error-page-home-link">
          {t("common.goToHome")}
        </Link>
      )}
    </div>
  );
};

export default AppErrorPage;
