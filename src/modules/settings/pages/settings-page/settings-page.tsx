import "./settings-page.css";
import PreferencesSettingsSection from "../../components/preferences-settings-section/preferences-settings-section";
import CurrencyProfileSettingsSection from "../../components/currency-profile-settings-section/currency-profile-settings-section";
import AccountSettingsSection from "../../components/account-settings-section/account-settings-section";

const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page">
      {/* Account Section */}
      <AccountSettingsSection />

      {/* Currency Profile Settings Section */}
      <CurrencyProfileSettingsSection />

      {/* Preferences Settings Section */}
      <PreferencesSettingsSection />
    </div>
  );
};

export default SettingsPage;
