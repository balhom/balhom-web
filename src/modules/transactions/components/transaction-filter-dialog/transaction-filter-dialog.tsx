import "./transaction-filter-dialog.css";
import { useTranslation } from "react-i18next";
import { X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import { AppDispatch, AppState } from "../../../../store";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import {
  fetchExpensesPageAsync,
  fetchIncomesPageAsync,
} from "../../states/redux/thunks/transactions-page-thunks";
import { TransactionFiltersEntity } from "../../data/entities/transaction-filters-entity";
import { useCallback, useState } from "react";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";

interface Props {
  type: TransactionTypeEnum;
  selectedMonth: number;
  selectedYear: number;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionFilterDialog: React.FC<Props> = ({
  type,
  selectedMonth,
  selectedYear,
  isOpen,
  onClose,
}: Props) => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionsPageState = useSelector((state: AppState) =>
    type === TransactionTypeEnum.Income ? state.incomesPage : state.expensesPage
  );
  const dispatch: AppDispatch = useDispatch();

  const [minAmount, setMinAmount] = useState<string | undefined>(
    transactionsPageState.filter.minAmount?.toString()
  );
  const [maxAmount, setMaxAmount] = useState<string | undefined>(
    transactionsPageState.filter.maxAmount?.toString()
  );

  const dispatchFecthTransactionsPageAsync = useCallback(
    (filters: TransactionFiltersEntity) => {
      if (selectedCurrencyProfile) {
        if (type === TransactionTypeEnum.Income) {
          dispatch(
            fetchIncomesPageAsync({
              currencyProfileId: selectedCurrencyProfile.id,
              month: selectedMonth,
              year: selectedYear,
              filters: filters,
              search: transactionsPageState.search,
              sort: transactionsPageState.sortValue,
              pageNum: transactionsPageState.page.pageNum,
            })
          );
        } else {
          dispatch(
            fetchExpensesPageAsync({
              currencyProfileId: selectedCurrencyProfile.id,
              month: selectedMonth,
              year: selectedYear,
              filters: filters,
              search: transactionsPageState.search,
              sort: transactionsPageState.sortValue,
              pageNum: transactionsPageState.page.pageNum,
            })
          );
        }
      }
    },
    [
      dispatch,
      selectedCurrencyProfile,
      selectedMonth,
      selectedYear,
      transactionsPageState.page.pageNum,
      transactionsPageState.search,
      transactionsPageState.sortValue,
      type,
    ]
  );

  if (!isOpen) return null;

  return (
    <div className="transaction-filter-dialog-overlay" onClick={onClose}>
      <div
        className="transaction-filter-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transaction-filter-dialog-header">
          <h2>{t("common.filters")}</h2>
          <button
            className="transaction-filter-dialog-close-button"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="transaction-filter-dialog-content">
          <div className="transaction-filter-dialog-section">
            <h3>{t("transaction.amountRangeFilter")}</h3>
            <div className="transaction-filter-dialog-amount-inputs">
              <AppNumberInput
                id="minAmount"
                value={minAmount ?? "0"}
                onChange={(value) => setMinAmount(value)}
              />

              <span className="transaction-filter-dialog-amount-separator">
                -
              </span>

              <AppNumberInput
                id="maxAmount"
                value={maxAmount ?? "0"}
                onChange={(value) => setMaxAmount(value)}
              />
            </div>
          </div>
        </div>

        <div className="transaction-filter-dialog-actions">
          <button
            className="transaction-filter-dialog-apply-button"
            onClick={() => {
              dispatchFecthTransactionsPageAsync({
                minAmount: Number(minAmount?.replace(",", ".")),
                maxAmount: Number(maxAmount?.replace(",", ".")),
              });

              onClose();
            }}
          >
            {t("common.apply")}
          </button>

          <button
            className="transaction-filter-dialog-clear-button"
            onClick={() => {
              dispatchFecthTransactionsPageAsync({
                minAmount: undefined,
                maxAmount: undefined,
              });

              onClose();
            }}
          >
            <Trash2 size={18} />
            <span>{t("common.clear")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilterDialog;
