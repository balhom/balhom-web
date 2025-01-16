import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Settings,
  Menu
} from 'lucide-react';
import { useCurrencyProfile } from '../../hooks/use-currency-profile';
import CurrencyProfileSelector from '../currency-profile/currency-profile-selector/currency-profile-selector';
import { mockCurrencyProfiles } from '../../data/mock-currency-profiles';
import './app-header.css';

const AppHeader = () => {
  const { t } = useTranslation();
  const { profile, setProfile } = useCurrencyProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={20} />
        <span className="nav-link-text">{t('navigation.dashboard')}</span>
      </NavLink>
      <NavLink to="/income" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <ArrowUpCircle size={20} />
        <span className="nav-link-text">{t('navigation.income')}</span>
      </NavLink>
      <NavLink to="/expenses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <ArrowDownCircle size={20} />
        <span className="nav-link-text">{t('navigation.expenses')}</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        <Settings size={20} />
        <span className="nav-link-text">{t('navigation.settings')}</span>
      </NavLink>
    </>
  );

  return (
    <header className="app-header">
      <div className="app-header-content">
        <NavLink to="/" className="app-header-logo">
          <span className="logo-bal">Bal</span>
          <span className="logo-hom">Hom</span>
        </NavLink>

        <nav className="app-header-nav">
          <NavLinks />
        </nav>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {profile && (
          <CurrencyProfileSelector
            profile={profile}
            onProfileChange={setProfile}
            availableProfiles={mockCurrencyProfiles}
          />
        )}
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLinks />
      </div>
    </header>
  );
};

export default AppHeader;