import React, { useEffect, useState } from "react";
import { AppError } from "../../../../common/data/errors/app-error";
import { useTranslation } from "react-i18next";
import { AccountEntity } from "../../data/entities/account-entity";
import { getAccount } from "../../usecases/get-account-usecase";
import { Either } from "../../../../common/data/either";
import { AccountContext } from "../contexts/account-context";
import AppErrorPage from "../../../../common/pages/app-error-page/app-error-page";
import AppLoaderPage from "../../../../common/pages/app-loader-page/app-loader-page";

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n, t } = useTranslation();

  const [account, setAccount] = useState<AccountEntity | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getAccount().then((accountEither) =>
      accountEither.fold(
        (error: AppError) => {
          setIsError(true);
          return Either.left(error);
        },
        (account) => {
          setAccount(account);

          if (account.locale) {
            i18n.changeLanguage(account.locale);
          }

          return Either.right(account);
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  if (account == null) {
    return <AppLoaderPage />;
  }

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
