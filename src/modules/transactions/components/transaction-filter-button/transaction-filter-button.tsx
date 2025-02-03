import "./transaction-filter-button.css";
import React from "react";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";

interface Props {
  type: TransactionTypeEnum;
  isOpen: boolean;
  onClick: () => void;
  activeFiltersCount?: number;
}

const TransactionFilterButton: React.FC<Props> = ({
  type,
  isOpen,
  onClick,
  activeFiltersCount = 0,
}: Props) => {
  const { t } = useTranslation();

  return (
    <button
      className={`transaction-filter-button ${
        isOpen ? `active ${type.toLowerCase()}-background-and-border` : ""
      }`}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <Filter size={20} />
      <span>{t("common.filters")}</span>
      {activeFiltersCount > 0 && (
        <span
          className={`transaction-filter-button-count ${type.toLowerCase()}-background`}
        >
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};

export default TransactionFilterButton;
