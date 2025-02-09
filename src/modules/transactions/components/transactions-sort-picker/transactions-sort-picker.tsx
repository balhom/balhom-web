import "./transactions-sort-picker.css";
import { useTranslation } from "react-i18next";
import { ArrowUpDown } from "lucide-react";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../store";
import {
  fetchExpensesPageAsync,
  fetchIncomesPageAsync,
} from "../../states/redux/thunks/transactions-page-thunks";
import { TransactionSortEnum } from "../../data/enums/transaction-sort-enum";

interface Props {
  type: TransactionTypeEnum;
  selectedMonth: number;
  selectedYear: number;
}

const TransactionsSortPicker: React.FC<Props> = ({
  type,
  selectedMonth,
  selectedYear,
}: Props) => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionsPageState = useSelector((state: AppState) =>
    type === TransactionTypeEnum.Income ? state.incomesPage : state.expensesPage
  );
  const dispatch: AppDispatch = useDispatch();

  const dispatchFecthTransactionsPageAsync = (
    sortValue: TransactionSortEnum
  ) => {
    if (selectedCurrencyProfile) {
      if (type === TransactionTypeEnum.Income) {
        dispatch(
          fetchIncomesPageAsync({
            currencyProfile: selectedCurrencyProfile,
            month: selectedMonth,
            year: selectedYear,
            filters: transactionsPageState.filter,
            sort: sortValue,
            pageNum: transactionsPageState.page.pageNum,
          })
        );
      } else {
        dispatch(
          fetchExpensesPageAsync({
            currencyProfile: selectedCurrencyProfile,
            month: selectedMonth,
            year: selectedYear,
            filters: transactionsPageState.filter,
            sort: sortValue,
            pageNum: transactionsPageState.page.pageNum,
          })
        );
      }
    }
  };

  return (
    <div className="transactions-sort-picker">
      <ArrowUpDown size={20} className="transactions-sort-picker-icon" />
      <select
        className="transactions-sort-picker-select"
        value={transactionsPageState.sortValue}
        onChange={(e) =>
          dispatchFecthTransactionsPageAsync(
            e.target.value as TransactionSortEnum
          )
        }
      >
        <option value={TransactionSortEnum.DateDesc}>
          {t("transaction.sortDateDesc")}
        </option>
        <option value={TransactionSortEnum.DateAsc}>
          {t("transaction.sortDateAsc")}
        </option>
        <option value={TransactionSortEnum.AmountDesc}>
          {t("transaction.sortAmountDesc")}
        </option>
        <option value={TransactionSortEnum.AmountAsc}>
          {t("transaction.sortAmountAsc")}
        </option>
        <option value={TransactionSortEnum.TitleDesc}>
          {t("transaction.sortTitleAsc")}
        </option>
        <option value={TransactionSortEnum.TitleAsc}>
          {t("transaction.sortTitleDesc")}
        </option>
      </select>
    </div>
  );
};

export default TransactionsSortPicker;
