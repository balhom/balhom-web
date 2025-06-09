import "./transaction-list.css";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../../../common/components/pagination/pagination";
import TransactionCard from "../transaction-card/transaction-card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../store";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import {
  fetchExpensesPageAsync,
  fetchIncomesPageAsync,
} from "../../states/redux/thunks/transactions-page-thunks";
import TransactionFilterButton from "../transaction-filter-button/transaction-filter-button";
import TransactionFilterDialog from "../transaction-filter-dialog/transaction-filter-dialog";
import TransactionsSortPicker from "../transactions-sort-picker/transactions-sort-picker";
import SearchTextInput from "../../../../common/components/search-text-input/search-text-input";

interface Props {
  type: TransactionTypeEnum;
  selectedMonth: number;
  selectedYear: number;
}

let searchTimer: number | undefined;

const TransactionList: React.FC<Props> = ({
  type,
  selectedMonth,
  selectedYear,
}: Props) => {
  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const [searchTerm, setSearchTerm] = useState("");

  const transactionsPageState = useSelector((state: AppState) =>
    type === TransactionTypeEnum.Income ? state.incomesPage : state.expensesPage
  );
  const dispatch: AppDispatch = useDispatch();

  const dispatchFecthTransactionsPageAsync = useCallback(
    (pageNum: number, search: string) => {
      if (selectedCurrencyProfile) {
        if (type === TransactionTypeEnum.Income) {
          dispatch(
            fetchIncomesPageAsync({
              currencyProfile: selectedCurrencyProfile,
              month: selectedMonth,
              year: selectedYear,
              search: search,
              filters: transactionsPageState.filter,
              sort: transactionsPageState.sortValue,
              pageNum: pageNum,
            })
          );
        } else {
          dispatch(
            fetchExpensesPageAsync({
              currencyProfile: selectedCurrencyProfile,
              month: selectedMonth,
              year: selectedYear,
              search: search,
              filters: transactionsPageState.filter,
              sort: transactionsPageState.sortValue,
              pageNum: pageNum,
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
      transactionsPageState.filter,
      transactionsPageState.sortValue,
      type,
    ]
  );

  useEffect(() => {
    dispatchFecthTransactionsPageAsync(
      transactionsPageState.page.pageNum,
      searchTerm
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyProfile, selectedMonth, selectedYear, type]);

  useEffect(() => {
    clearTimeout(searchTimer);

    if (transactionsPageState.search !== searchTerm) {
      searchTimer = setTimeout(() => {
        dispatchFecthTransactionsPageAsync(
          transactionsPageState.page.pageNum,
          searchTerm
        );
      }, 1000);
    }
    return () => clearTimeout(searchTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, dispatchFecthTransactionsPageAsync]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const minAmount = transactionsPageState.filter.minAmount;
  const maxAmount = transactionsPageState.filter.maxAmount;

  const getActiveFiltersCount = useCallback(() => {
    let count = 0;

    if (minAmount) count++;
    if (maxAmount) count++;

    return count;
  }, [maxAmount, minAmount]);

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <SearchTextInput
          text={searchTerm}
          onTextChange={(newText) => setSearchTerm(newText)}
          maxLength={15}
        />

        <div className="transaction-list-actions">
          <TransactionFilterButton
            type={type}
            isOpen={isFilterOpen}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            activeFiltersCount={getActiveFiltersCount()}
          />

          <TransactionsSortPicker
            type={type}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>
      </div>

      <TransactionFilterDialog
        type={type}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="transaction-list-cards">
        {transactionsPageState.page.results.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        ))}
      </div>

      <div className="transaction-list-footer">
        <Pagination
          type={type}
          page={transactionsPageState.page}
          onPageChange={(newPageNum) => {
            dispatchFecthTransactionsPageAsync(newPageNum, searchTerm);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionList;
