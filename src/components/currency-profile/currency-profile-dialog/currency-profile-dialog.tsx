import { X, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CurrencyProfile } from '../../../types/currency-profile';
import { formatCurrency } from '../../../utils/currency';
import './currency-profile-dialog.css';

interface CurrencyProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: CurrencyProfile[];
  selectedProfile: CurrencyProfile;
  onSelectProfile: (profile: CurrencyProfile) => void;
}

const CurrencyProfileDialog = ({
  isOpen,
  onClose,
  profiles,
  selectedProfile,
  onSelectProfile,
}: CurrencyProfileDialogProps) => {
  const { t } = useTranslation();

  const handleCreateProfile = () => {
    // Will be implemented later
    console.log('Create new profile');
  };

  if (!isOpen) return null;

  return (
    <div className="profile-dialog-overlay" onClick={onClose}>
      <div className="profile-dialog" onClick={e => e.stopPropagation()}>
        <div className="profile-dialog-header">
          <h2 className="profile-dialog-title">{t('currencyProfile.selectProfile')}</h2>
          <button className="close-button" onClick={onClose} aria-label={t('common.close')}>
            <X size={20} />
          </button>
        </div>
        <div className="profile-list">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-item ${profile.id === selectedProfile.id ? 'selected' : ''}`}
              onClick={() => {
                onSelectProfile(profile);
                onClose();
              }}
            >
              <img
                src={profile.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
                alt={profile.name}
                className="profile-image"
              />
              <div className="profile-item-info">
                <div className="profile-item-name">{profile.name}</div>
                <div className="profile-item-amount">
                  {formatCurrency(profile.balance || 0, profile.currency)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="profile-dialog-footer">
          <button 
            className="create-profile-button"
            onClick={handleCreateProfile}
          >
            <Plus size={18} />
            {t('currencyProfile.create')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyProfileDialog;