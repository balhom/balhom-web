import "./transaction-category-picker.css";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { TransactionCategoryEnum } from "../../data/enums/transaction-category-enum";
import { categoryToImage, formatTransactionCategory } from "../../utils";
import { useTranslation } from "react-i18next";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";

interface Props {
  type: TransactionTypeEnum;
  value: TransactionCategoryEnum;
  onChange: (value: TransactionCategoryEnum) => void;
}

const TransactionCategoryPicker: React.FC<Props> = ({
  type,
  value,
  onChange,
}: Props) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="transaction-category-picker" ref={dropdownRef}>
      <button
        type="button"
        className="transaction-category-picker-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <img
          src={categoryToImage(value)}
          alt={formatTransactionCategory(value, t)}
          className="transaction-category-picker-trigger-image"
        />

        {formatTransactionCategory(value, t)}

        <ChevronDown
          size={20}
          className={`transaction-category-picker-trigger-arrow ${
            isOpen ? "open" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="transaction-category-picker-dropdown">
          {Object.entries(TransactionCategoryEnum)
            .filter((c) =>
              c
                .toString()
                .toLowerCase()
                .startsWith(type.toString().toLowerCase())
            )
            .map(([key, category]) => (
              <div
                key={category}
                className={`transaction-category-picker-option ${
                  key === value ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(category);
                  setIsOpen(false);
                }}
              >
                <img
                  src={categoryToImage(category)}
                  alt={formatTransactionCategory(category, t)}
                  className="transaction-category-picker-option-image"
                />
                <span className="transaction-category-picker-option-text">
                  {formatTransactionCategory(category, t)}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TransactionCategoryPicker;
