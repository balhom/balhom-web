import "./transaction-list.css";
import { useEffect, useState } from "react";
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

interface Props {
  type: TransactionTypeEnum;
  selectedMonth: number;
  selectedYear: number;
}

const TransactionList: React.FC<Props> = ({
  type,
  selectedMonth,
  selectedYear,
}: Props) => {
  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionsPageState = useSelector((state: AppState) =>
    type === TransactionTypeEnum.Income ? state.incomesPage : state.expensesPage
  );
  const dispatch: AppDispatch = useDispatch();

  const dispatchFecthTransactionsPageAsync = (pageNum: number) => {
    if (selectedCurrencyProfile) {
      if (type === TransactionTypeEnum.Income) {
        dispatch(
          fetchIncomesPageAsync({
            currencyProfile: selectedCurrencyProfile,
            month: selectedMonth,
            year: selectedYear,
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
            filters: transactionsPageState.filter,
            sort: transactionsPageState.sortValue,
            pageNum: pageNum,
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatchFecthTransactionsPageAsync(transactionsPageState.page.pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyProfile, selectedMonth, selectedYear, type]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  let minAmount = transactionsPageState.filter.minAmount;
  let maxAmount = transactionsPageState.filter.maxAmount;
  let startDate = transactionsPageState.filter.startDate;
  let endDate = transactionsPageState.filter.endDate;

  const getActiveFiltersCount = () => {
    let count = 0;

    if (minAmount) count++;
    if (maxAmount) count++;
    if (startDate) count++;
    if (endDate) count++;

    return count;
  };

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        {/* 
        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          activeFiltersCount={getActiveFiltersCount()}
        />
        <IncomeSort
          value={sortValue}
          onChange={(value) => {
            setSortValue(value);
            handleFilterChange();
          }}
        />
      */}
      </div>

      {/* 
        <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        minAmount={minAmount}
        maxAmount={maxAmount}
        startDate={startDate}
        endDate={endDate}
        onMinAmountChange={setMinAmount}
        onMaxAmountChange={setMaxAmount}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onClearFilters={() => {
          setMinAmount("");
          setMaxAmount("");
          setStartDate(null);
          setEndDate(null);
          handleFilterChange();
        }}
        onApplyFilters={handleFilterChange}
      />
      */}

      <div className="transaction-list-cards">
        {transactionsPageState.page.results.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      <div className="transaction-list-footer">
        <Pagination
          type={type}
          page={transactionsPageState.page}
          onPageChange={(newPageNum) => {
            dispatchFecthTransactionsPageAsync(newPageNum);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionList;
