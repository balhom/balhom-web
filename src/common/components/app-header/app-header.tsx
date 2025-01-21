import "./app-header.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  ArrowUpCircle,
  ArrowDownCircle,
  Settings,
  Menu,
} from "lucide-react";
import CurrencyProfileSelector from "../../../components/currency-profile/currency-profile-selector/currency-profile-selector";
import { mockCurrencyProfiles } from "../../../mocks/mock-currency-profiles";
import { useCurrencyProfiles } from "../../../modules/currency-profile/states/contexts/currency-profiles-context";

const AppHeader: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile, setSelectedCurrencyProfile } =
    useCurrencyProfiles();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <LayoutDashboard size={20} />
        <span className="nav-link-text">{t("navigation.dashboard")}</span>
      </NavLink>
      <NavLink
        to="/income"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <ArrowUpCircle size={20} />
        <span className="nav-link-text">{t("navigation.income")}</span>
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <ArrowDownCircle size={20} />
        <span className="nav-link-text">{t("navigation.expenses")}</span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        <Settings size={20} />
        <span className="nav-link-text">{t("navigation.settings")}</span>
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

        {selectedCurrencyProfile && (
          <CurrencyProfileSelector
            profile={selectedCurrencyProfile}
            onProfileChange={setSelectedCurrencyProfile}
            availableProfiles={mockCurrencyProfiles}
          />
        )}
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <NavLinks />
      </div>
    </header>
  );
};

export default AppHeader;
