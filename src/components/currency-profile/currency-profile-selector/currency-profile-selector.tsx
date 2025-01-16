import { useState } from 'react';
import type { CurrencyProfile } from '../../../types/currency-profile';
import { formatCurrency } from '../../../utils/currency';
import CurrencyProfileDialog from '../currency-profile-dialog/currency-profile-dialog';
import './currency-profile-selector.css';

interface CurrencyProfileSelectorProps {
  profile: CurrencyProfile;
  onProfileChange: (profile: CurrencyProfile) => void;
  availableProfiles: CurrencyProfile[];
}

const CurrencyProfileSelector = ({
  profile,
  onProfileChange,
  availableProfiles
}: CurrencyProfileSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="profile-selector" onClick={() => setIsDialogOpen(true)}>
        <div className="profile-info">
          <span className="profile-name">{profile.name}</span>
          <span className="profile-amount">
            {formatCurrency(profile.balance || 0, profile.currency)}
          </span>
        </div>
        <img
          src={profile.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
          alt={profile.name}
          className="profile-image"
        />
      </div>

      <CurrencyProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        profiles={availableProfiles}
        selectedProfile={profile}
        onSelectProfile={onProfileChange}
      />
    </>
  );
};

export default CurrencyProfileSelector;