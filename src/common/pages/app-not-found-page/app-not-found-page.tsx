import React from "react";
import { useTranslation } from "react-i18next";
import AppErrorPage from "../app-error-page/app-error-page";

const AppNotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return <AppErrorPage title={t("common.pageNotFound")} showHomeBtn={true} />;
};

export default AppNotFoundPage;
