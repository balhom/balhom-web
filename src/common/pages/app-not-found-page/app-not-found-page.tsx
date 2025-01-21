import "./app-not-found-page.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AppNotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="app-not-found-page">
      <h1>404</h1>
      <p>{t("common.pageNotFound")}</p>
      <Link to="/" className="app-not-found-page-home-link">
        {t("common.goToHome")}
      </Link>
    </div>
  );
};

export default AppNotFoundPage;
