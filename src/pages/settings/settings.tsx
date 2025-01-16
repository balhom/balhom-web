import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/use-auth';
import { useCurrencyProfile } from '../../hooks/use-currency-profile';
import { KeyRound, LogOut, Trash2, X, UserPlus, Moon, Sun, Languages } from 'lucide-react';
import ImagePicker from '../../components/forms/image-picker/image-picker';
import CurrencySelect from '../../components/forms/currency-select/currency-select';
import NumberInput from '../../components/forms/number-input/number-input';
import './settings.css';
import { useTheme } from '../../common/states/contexts/theme-mode-context';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { profile } = useCurrencyProfile();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isProfileDeleting, setIsProfileDeleting] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Mock shared users
  const [sharedUsers] = useState(['shared@example.com', 'another@example.com']);

  if (!user || !profile) return null;

  const handleProfileUpdate = (field: string, value: any) => {
    // Will be implemented later
    console.log('Update profile:', field, value);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented later
    console.log('Add user:', newUserEmail);
    setNewUserEmail('');
  };

  const handleRemoveUser = (email: string) => {
    // Will be implemented later
    console.log('Remove user:', email);
  };

  const handleDeleteProfile = () => {
    setIsProfileDeleting(true);
    // Will be implemented later
    console.log('Delete profile:', profile.id);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="settings-page">
      {/* Account Section */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">{t('settings.account')}</h2>
          <p className="settings-section-description">
            {t('settings.accountDescription')}
          </p>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.email')}</div>
                <div className="settings-item-description">
                  {t('settings.emailDescription')}
                </div>
              </div>
              <div className="settings-item-value">{user.email}</div>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.password')}</div>
                <div className="settings-item-description">
                  {t('settings.passwordDescription')}
                </div>
              </div>
              <button className="settings-button secondary">
                <KeyRound size={18} />
                {t('settings.changePassword')}
              </button>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.logout')}</div>
                <div className="settings-item-description">
                  {t('settings.logoutDescription')}
                </div>
              </div>
              <button className="settings-button secondary">
                <LogOut size={18} />
                {t('settings.logoutButton')}
              </button>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.deleteAccount')}</div>
                <div className="settings-item-description">
                  {t('settings.deleteAccountDescription')}
                </div>
              </div>
              <button 
                className="settings-button danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 size={18} />
                {t('settings.deleteAccountButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Currency Profile Section */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">{t('settings.currencyProfile')}</h2>
          <p className="settings-section-description">
            {t('settings.currencyProfileDescription')}
          </p>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-profile-header">
              <ImagePicker
                value={profile.imageUrl || ''}
                onChange={(value) => handleProfileUpdate('imageUrl', value)}
              />
            </div>
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.profileName')}</div>
              </div>
              <input
                type="text"
                className="settings-item-value"
                value={profile.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.currency')}</div>
              </div>
              <CurrencySelect
                value={profile.currency}
                onChange={(value) => handleProfileUpdate('currency', value)}
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.monthlySavingsGoal')}</div>
              </div>
              <NumberInput
                id="monthlySavingsGoal"
                value={profile.monthlySavingsGoal || 0}
                onChange={(value) => handleProfileUpdate('monthlySavingsGoal', value)}
                label=""
                currency={profile.currency}
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.yearlySavingsGoal')}</div>
              </div>
              <NumberInput
                id="yearlySavingsGoal"
                value={profile.yearlySavingsGoal || 0}
                onChange={(value) => handleProfileUpdate('yearlySavingsGoal', value)}
                label=""
                currency={profile.currency}
              />
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.sharedUsers')}</div>
                <div className="settings-item-description">
                  {t('settings.sharedUsersDescription')}
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
                      aria-label={t('settings.removeUser')}
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
                  placeholder={t('settings.addUserPlaceholder')}
                  required
                />
                <button type="submit" className="add-user-button">
                  <UserPlus size={18} />
                  {t('settings.addUser')}
                </button>
              </form>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.deleteProfile')}</div>
                <div className="settings-item-description">
                  {t('settings.deleteProfileDescription')}
                </div>
              </div>
              <button 
                className="settings-button danger"
                onClick={handleDeleteProfile}
                disabled={isProfileDeleting}
              >
                <Trash2 size={18} />
                {t('settings.deleteProfileButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Settings Section */}
      <section className="settings-section">
        <div className="settings-section-header">
          <h2 className="settings-section-title">{t('settings.appPreferences')}</h2>
          <p className="settings-section-description">
            {t('settings.appPreferencesDescription')}
          </p>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-header">
              <div className="settings-item-info">
                <div className="settings-item-title">{t('settings.language')}</div>
                <div className="settings-item-description">
                  {t('settings.languageDescription')}
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
                <div className="settings-item-title">{t('settings.theme')}</div>
                <div className="settings-item-description">
                  {t('settings.themeDescription')}
                </div>
              </div>
              <button
                className={`theme-toggle-button ${isDarkMode ? 'dark' : 'light'}`}
                onClick={toggleTheme}
                aria-label={t('settings.toggleTheme')}
              >
                {isDarkMode ? (
                  <Sun size={20} className="theme-icon" />
                ) : (
                  <Moon size={20} className="theme-icon" />
                )}
                <span className="theme-label">
                  {isDarkMode ? t('settings.lightMode') : t('settings.darkMode')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;