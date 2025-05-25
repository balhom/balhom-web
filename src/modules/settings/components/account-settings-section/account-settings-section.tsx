import "./account-settings-section.css";
import { useTranslation } from "react-i18next";
import { useOidc } from "../../../../common/config/oidc";
import DeleteSettingsButton from "../delete-settings-button/delete-settings-button";
import { useState } from "react";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import LogoutSettingsButton from "../logout-settings-button/logout-settings-button";
import ChanngePasswordSettingsButton from "../change-password-settings-button/change-password-settings-button";

const AccountSettingsSection: React.FC = () => {
  const { t } = useTranslation();

  const { goToAuthServer, logout, tokens } = useOidc();
  const userEmail = tokens?.decodedIdToken?.email?.toString() ?? "";

  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);

  const handleDeleteAccount = () => {
    setIsDeletingAccount(true);

    // TODO Will be implemented later

    setIsDeletingAccount(false);
  };

  return (
    <section className="account-settings-section">
      <div className="account-settings-section-header">
        <h2 className="account-settings-section-title">
          {t("settings.account")}
        </h2>

        <p className="account-settings-section-description">
          {t("settings.accountDescription")}
        </p>
      </div>

      <div className="account-settings-section-list">
        <div className="account-settings-section-item">
          <div className="account-settings-section-halfitem">
            <div className="account-settings-section-item-title">
              {t("settings.email")}
            </div>

            <div className="account-settings-section-item-description">
              {t("settings.emailDescription")}
            </div>
          </div>

          <div className="account-settings-section-halfitem">
            <AppTextInput
              id="account-email"
              text={userEmail}
              onTextChange={() => {}}
              isReadOnly={true}
            />
          </div>
        </div>

        <div className="account-settings-section-item">
          <div>
            <div className="account-settings-section-item-title">
              {t("settings.password")}
            </div>

            <div className="account-settings-section-item-description">
              {t("settings.passwordDescription")}
            </div>
          </div>

          <ChanngePasswordSettingsButton
            onClick={() => {
              goToAuthServer?.({
                extraQueryParams: {
                  kc_action: "UPDATE_PASSWORD",
                },
              });
            }}
          />
        </div>

        <div className="account-settings-section-item">
          <div>
            <div className="account-settings-section-item-title">
              {t("settings.logout")}
            </div>

            <div className="account-settings-section-item-description">
              {t("settings.logoutDescription")}
            </div>
          </div>

          <LogoutSettingsButton
            onClick={() => {
              logout?.({
                redirectTo: "current page",
              });
            }}
          />
        </div>

        <div className="account-settings-section-item">
          <div>
            <div className="account-settings-section-item-title">
              {t("settings.deleteAccount")}
            </div>

            <div className="account-settings-section-item-description">
              {t("settings.deleteAccountDescription")}
            </div>
          </div>

          <DeleteSettingsButton
            onClick={handleDeleteAccount}
            isDisabled={isDeletingAccount}
          />
        </div>
      </div>
    </section>
  );
};

export default AccountSettingsSection;
