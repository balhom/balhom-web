import React, { useEffect, useState } from "react";
import { AppError } from "../../../../common/data/errors/app-error";
import { useTranslation } from "react-i18next";
import { Either } from "../../../../common/data/either";
import AppErrorPage from "../../../../common/pages/app-error-page/app-error-page";
import AppLoaderPage from "../../../../common/pages/app-loader-page/app-loader-page";
import { CurrencyProfileEntity } from "../../data/entities/currency-profile-entity";
import { CurrencyProfilesContext } from "../contexts/currency-profiles-context";
import { getSelectedCurrencyProfile } from "../../usecases/get-selected-currency-profile-usecase";
import { getCurrencyProfiles } from "../../usecases/get-currency-profiles-usecase";
import { CREATE_CURRENCY_PROFILE_ROUTE_PATH } from "../../routes";
import { Navigate } from "react-router-dom";

export const CurrencyProfilesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  const [selectedCurrencyProfile, setSelectedCurrencyProfile] =
    useState<CurrencyProfileEntity | null>(null);

  const [currencyProfiles, setCurrencyProfiles] = useState<
    CurrencyProfileEntity[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getCurrencyProfiles().then((currencyProfilesEither) =>
      currencyProfilesEither.fold(
        (error: AppError) => {
          setIsError(true);
          setIsLoading(false);
          return Either.left(error);
        },
        (currencyProfiles) => {
          setSelectedCurrencyProfile(
            getSelectedCurrencyProfile(currencyProfiles)
          );

          setCurrencyProfiles(currencyProfiles);

          setIsLoading(false);
          return Either.right(null);
        }
      )
    );
  }, []);

  if (isError) {
    return (
      <AppErrorPage
        title={t("account.loadingErrorTitle")}
        message={t("account.loadingErrorMessage")}
        showHomeBtn={true}
      />
    );
  }
  if (isLoading) {
    return <AppLoaderPage />;
  }
  if (!currencyProfiles) {
    return <Navigate to={CREATE_CURRENCY_PROFILE_ROUTE_PATH} replace />;
  }
  return (
    <CurrencyProfilesContext.Provider
      value={{
        selectedCurrencyProfile,
        currencyProfiles,
        setSelectedCurrencyProfile,
        setCurrencyProfiles,
      }}
    >
      {children}
    </CurrencyProfilesContext.Provider>
  );
};
