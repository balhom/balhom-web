import "./transaction-filter-button.css";
import React from "react";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClick: () => void;
  activeFiltersCount?: number;
}

const TransactionFilterButton: React.FC<Props> = ({
  isOpen,
  onClick,
  activeFiltersCount = 0,
}: Props) => {
  const { t } = useTranslation();

  return (
    <button
      className={`transaction-filter-button ${isOpen ? "active" : ""}`}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <Filter size={20} />
      <span>{t("common.filters")}</span>
      {activeFiltersCount > 0 && (
        <span className="transaction-filter-button-count">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};

export default TransactionFilterButton;
