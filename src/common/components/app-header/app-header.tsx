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
import { DASHBOARD_ROUTE_PATH } from "../../../modules/dashboard/routes";
import { SETTINGS_ROUTE_PATH } from "../../../modules/settings/routes";
import {
  EXPENSE_ROUTE_PATH,
  INCOME_ROUTE_PATH,
} from "../../../modules/transactions/routes";
import CurrencyProfilePicker from "../../../modules/currency-profile/components/currency-profile-picker/currency-profile-picker";

const AppHeader: React.FC = () => {
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks: React.FC = () => (
    <>
      <NavLink
        to={DASHBOARD_ROUTE_PATH}
        className={({ isActive }) =>
          `app-header-nav-link ${isActive ? "active" : ""}`
        }
      >
        <LayoutDashboard size={20} />
        <span className="app-header-nav-link-text">
          {t("navigation.dashboard")}
        </span>
      </NavLink>
      <NavLink
        to={INCOME_ROUTE_PATH}
        className={({ isActive }) =>
          `app-header-nav-link ${isActive ? "active" : ""}`
        }
      >
        <ArrowUpCircle size={20} />
        <span className="app-header-nav-link-text">
          {t("navigation.income")}
        </span>
      </NavLink>
      <NavLink
        to={EXPENSE_ROUTE_PATH}
        className={({ isActive }) =>
          `app-header-nav-link ${isActive ? "active" : ""}`
        }
      >
        <ArrowDownCircle size={20} />
        <span className="app-header-nav-link-text">
          {t("navigation.expenses")}
        </span>
      </NavLink>
      <NavLink
        to={SETTINGS_ROUTE_PATH}
        className={({ isActive }) =>
          `app-header-nav-link ${isActive ? "active" : ""}`
        }
      >
        <Settings size={20} />
        <span className="app-header-nav-link-text">
          {t("navigation.settings")}
        </span>
      </NavLink>
    </>
  );

  return (
    <header className="app-header">
      <div className="app-header-content">
        {/* Logo Part */}
        <NavLink to={DASHBOARD_ROUTE_PATH} className="app-header-logo">
          <span className="app-header-logo-bal">Bal</span>
          <span className="app-header-logo-hom">Hom</span>
        </NavLink>

        {/* Pages Part (only available for desktop) */}
        <nav className="app-header-nav">
          <NavLinks />
        </nav>

        {/* Menu Button Part (only available for mobile) */}
        <button
          className="app-header-mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Menu Button Part (only available for mobile) */}
        <CurrencyProfilePicker />
      </div>

      {/* Pages Part (only available for mobile) */}
      <div
        className={`app-header-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => {
          setIsMobileMenuOpen(false);
        }}
      >
        <NavLinks />
      </div>
    </header>
  );
};

export default AppHeader;
