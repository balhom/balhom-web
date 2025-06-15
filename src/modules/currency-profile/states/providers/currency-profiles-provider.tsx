import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppErrorPage from "../../../../common/pages/app-error-page/app-error-page";
import AppLoaderPage from "../../../../common/pages/app-loader-page/app-loader-page";
import { CurrencyProfileEntity } from "../../data/entities/currency-profile-entity";
import { CurrencyProfilesContext } from "../contexts/currency-profiles-context";
import { getSelectedCurrencyProfile } from "../../usecases/get-selected-currency-profile-usecase";
import { listCurrencyProfiles } from "../../usecases/list-currency-profiles-usecase";
import { CREATE_CURRENCY_PROFILE_ROUTE_PATH } from "../../routes";
import { Navigate } from "react-router-dom";
import { listenCurrencyProfileChanges } from "../../usecases/listen-currency-profile-changes-usecase";
import { StreamChangeTypeEnum } from "../../../../common/data/enums/stream-change-type-enum";
import { getCurrencyProfile } from "../../usecases/get-currency-profile-usecase";
import { saveSelectedCurrencyProfile } from "../../usecases/save-selected-currency-profile-usecase";

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

  const onChangeSelectedCurrencyProfile = useCallback(
    (newCurrencyProfile: CurrencyProfileEntity | null) => {
      if (newCurrencyProfile) {
        // Persist currency profile as selected
        saveSelectedCurrencyProfile(newCurrencyProfile);
      }
      // Update the selected currency profile in the context
      setSelectedCurrencyProfile(newCurrencyProfile);
    },
    []
  );

  const fetchAndAddCurrencyProfile = useCallback(
    async (currencyProfileId: string) => {
      const newCurrencyProfile = await getCurrencyProfile(currencyProfileId);

      setCurrencyProfiles([...currencyProfiles, newCurrencyProfile]);
    },
    [currencyProfiles]
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    listCurrencyProfiles()
      .then((currencyProfiles) => {
        setSelectedCurrencyProfile(
          getSelectedCurrencyProfile(currencyProfiles)
        );

        setCurrencyProfiles(currencyProfiles);

        // Currency profile changes event listener
        listenCurrencyProfileChanges((event) => {
          const newCurrencyProfiles = [...currencyProfiles];

          // Create event handler
          if (event.action === StreamChangeTypeEnum.Create) {
            fetchAndAddCurrencyProfile(event.id);
          }
          // Update event handler
          else if (event.action === StreamChangeTypeEnum.Update) {
            const existsCurrencyProfile =
              newCurrencyProfiles.find(
                (oldCurrencyProfile) => oldCurrencyProfile.id === event.id
              ) !== undefined;

            if (!existsCurrencyProfile) {
              fetchAndAddCurrencyProfile(event.id);
            } else {
              // Update the existing currency profile
              setCurrencyProfiles(
                newCurrencyProfiles.map((oldCurrencyProfile) => {
                  if (oldCurrencyProfile.id === event.id) {
                    oldCurrencyProfile.balance = event.balance;
                    oldCurrencyProfile.monthlySavingsGoal = event.monthlyGoal;
                    oldCurrencyProfile.yearlySavingsGoal = event.yearlyGoal;
                    oldCurrencyProfile.imageUrl = event.imageUrl;
                  }
                  return oldCurrencyProfile;
                })
              );
            }
          }
          // Delete event handler
          else if (event.action === StreamChangeTypeEnum.Delete) {
            setCurrencyProfiles(
              newCurrencyProfiles.filter(
                (oldCurrencyProfile) => oldCurrencyProfile.id !== event.id
              )
            );
          }
        });

        setIsError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return <AppErrorPage title={t("common.genericError")} showHomeBtn={true} />;
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
        selectedCurrencyProfile: selectedCurrencyProfile,
        currencyProfiles: currencyProfiles,
        setSelectedCurrencyProfile: onChangeSelectedCurrencyProfile,
        setCurrencyProfiles: setCurrencyProfiles,
      }}
    >
      {children}
    </CurrencyProfilesContext.Provider>
  );
};
