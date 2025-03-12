import "./settings-page.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyRound,
  LogOut,
  Trash2,
  X,
  UserPlus,
  Moon,
  Sun,
  Languages,
} from "lucide-react";
import ImagePicker from "../../../../common/components/image-picker/image-picker";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { useTheme } from "../../../../common/states/contexts/theme-mode-context";
import CurrencyPicker from "../../../currency-profile/components/currency-picker/currency-picker";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";
import { ThemeModeEnum } from "../../../../common/data/enums/theme-mode-enum";
import { keycloakInstance } from "../../../../common/config/keycloak";

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isProfileDeleting, setIsProfileDeleting] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const { themeMode, setThemeMode } = useTheme();

  // Mock shared users
  const [sharedUsers] = useState(["shared@example.com", "another@example.com"]);

  if (!selectedCurrencyProfile) return null;

  // TODO
  const userEmail = "test@test.com";

  const handleProfileUpdate = (field: string, value: any) => {
    // Will be implemented later
    console.log("Update profile:", field, value);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented later
    console.log("Add user:", newUserEmail);
    setNewUserEmail("");
  };

  const handleRemoveUser = (email: string) => {
    // Will be implemented later
    console.log("Remove user:", email);
  };

  const handleDeleteProfile = () => {
    setIsProfileDeleting(true);
    // Will be implemented later
    console.log("Delete profile:", selectedCurrencyProfile.id);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="settings-page">
      {/* Account Section */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">{t("settings.account")}</h2>

          <p className="settings-section-description">
            {t("settings.accountDescription")}
          </p>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t("settings.email")}</div>
                <div className="settings-item-description">
                  {t("settings.emailDescription")}
                </div>
              </div>
              <div className="settings-item-value">{userEmail}</div>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.password")}
                </div>
                <div className="settings-item-description">
                  {t("settings.passwordDescription")}
                </div>
              </div>
              <button
                className="settings-button secondary"
                onClick={() => {
                  const changePasswordUrl = `${keycloakInstance.authServerUrl}/realms/${keycloakInstance.realm}/login-actions/required-action?execution=UPDATE_PASSWORD&client_id=${keycloakInstance.clientId}`;

                  window.location.href = changePasswordUrl;
                }}
              >
                <KeyRound size={18} />
                {t("settings.changePassword")}
              </button>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.logout")}
                </div>
                <div className="settings-item-description">
                  {t("settings.logoutDescription")}
                </div>
              </div>
              <button
                className="settings-button secondary"
                onClick={() => {
                  keycloakInstance.logout();
                }}
              >
                <LogOut size={18} />
                {t("settings.logoutButton")}
              </button>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.deleteAccount")}
                </div>
                <div className="settings-item-description">
                  {t("settings.deleteAccountDescription")}
                </div>
              </div>
              <button
                className="settings-button danger"
                onClick={() => {
                  // TODO: call api
                }}
              >
                <Trash2 size={18} />
                {t("settings.deleteAccountButton")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Currency Profile Section */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">
            {t("settings.currencyProfile")}
          </h2>
          <p className="settings-section-description">
            {t("settings.currencyProfileDescription")}
          </p>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-profile-header">
              <ImagePicker
                initialImageUrl={selectedCurrencyProfile?.imageUrl}
                onImageChange={(value) =>
                  handleProfileUpdate("imageUrl", value)
                }
              />
            </div>
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.profileName")}
                </div>
              </div>
              <input
                type="text"
                className="settings-item-value"
                value={selectedCurrencyProfile.name}
                onChange={(e) => handleProfileUpdate("name", e.target.value)}
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.currency")}
                </div>
              </div>
              <CurrencyPicker
                value={selectedCurrencyProfile.currency}
                onChange={(value) => handleProfileUpdate("currency", value)}
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.monthlySavingsGoal")}
                </div>
              </div>
              <AppNumberInput
                id="monthlySavingsGoal"
                value={
                  selectedCurrencyProfile.monthlySavingsGoal?.toString() ?? "0"
                }
                onChange={(value) =>
                  handleProfileUpdate("monthlySavingsGoal", value)
                }
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.yearlySavingsGoal")}
                </div>
              </div>
              <AppNumberInput
                id="yearlySavingsGoal"
                value={
                  selectedCurrencyProfile.yearlySavingsGoal?.toString() || "0"
                }
                onChange={(value) =>
                  handleProfileUpdate("yearlySavingsGoal", value)
                }
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.sharedUsers")}
                </div>
                <div className="settings-item-description">
                  {t("settings.sharedUsersDescription")}
                </div>
              </div>
            </div>
            <div className="settings-shared-users">
              <div className="shared-user-list">
                {sharedUsers.map((email) => (
                  <div key={email} className="shared-user-item">
                    <span className="shared-user-email">{email}</span>
                    <button
                      className="remove-user-button"
                      onClick={() => handleRemoveUser(email)}
                      aria-label={t("settings.removeUser")}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <form className="add-user-form" onSubmit={handleAddUser}>
                <input
                  type="email"
                  className="add-user-input"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder={t("settings.addUserPlaceholder")}
                  required
                />
                <button type="submit" className="add-user-button">
                  <UserPlus size={18} />
                  {t("settings.addUser")}
                </button>
              </form>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.deleteProfile")}
                </div>
                <div className="settings-item-description">
                  {t("settings.deleteProfileDescription")}
                </div>
              </div>
              <button
                className="settings-button danger"
                onClick={handleDeleteProfile}
                disabled={isProfileDeleting}
              >
                <Trash2 size={18} />
                {t("settings.deleteProfileButton")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Settings Section */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">
            {t("settings.appPreferences")}
          </h2>
          <p className="settings-section-description">
            {t("settings.appPreferencesDescription")}
          </p>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">
                  {t("settings.language")}
                </div>
                <div className="settings-item-description">
                  {t("settings.languageDescription")}
                </div>
              </div>
              <div className="language-selector">
                <Languages size={20} className="language-icon" />
                <select
                  value={i18n.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="language-select"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t("settings.theme")}</div>
                <div className="settings-item-description">
                  {t("settings.themeDescription")}
                </div>
              </div>
              <button
                className={`theme-toggle-button ${
                  themeMode === ThemeModeEnum.Dark ? "dark" : "light"
                }`}
                onClick={() => {
                  setThemeMode(
                    themeMode === ThemeModeEnum.Dark
                      ? ThemeModeEnum.Light
                      : ThemeModeEnum.Dark
                  );
                }}
                aria-label={t("settings.toggleTheme")}
              >
                {themeMode === ThemeModeEnum.Dark ? (
                  <Sun size={20} className="theme-icon" />
                ) : (
                  <Moon size={20} className="theme-icon" />
                )}
                <span className="theme-label">
                  {ThemeModeEnum.Dark
                    ? t("settings.lightMode")
                    : t("settings.darkMode")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
