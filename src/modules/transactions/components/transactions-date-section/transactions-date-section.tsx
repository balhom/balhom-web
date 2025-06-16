import "./transactions-date-section.css";
import { useDispatch, useSelector } from "react-redux";
import RefreshButton from "../../../../common/components/refresh-button/refresh-button";
import { AppDispatch, AppState } from "../../../../store";
import { MonthPicker } from "../../../../common/components/month-picker/month-picker";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { getYearsBetweenDates } from "../../../../common/utils/date-utils";
import { YearPicker } from "../../../../common/components/year-picker/year-picker";
import {
  fetchExpensesPageAsync,
  fetchIncomesPageAsync,
} from "../../states/redux/thunks/transactions-page-thunks";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import { useCallback, useMemo } from "react";

interface Props {
  type: TransactionTypeEnum;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const TransactionsDateSection: React.FC<Props> = ({
  type,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: Props) => {
  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionCategoryStatisticsState = useSelector(
    (state: AppState) => state.transactionCategoryStatistics
  );

  const transactionsPageState = useSelector((state: AppState) =>
    type === TransactionTypeEnum.Income ? state.incomesPage : state.expensesPage
  );
  const dispatch: AppDispatch = useDispatch();

  const isLoading =
    transactionCategoryStatisticsState.isStatisticsLoading ||
    transactionsPageState.isLoading;

  const availableYears = useMemo(() => {
    let availableYears: number[] = [selectedYear];
    if (selectedCurrencyProfile?.initialDate) {
      availableYears = getYearsBetweenDates(
        selectedCurrencyProfile?.initialDate,
        new Date()
      );
    }
    return availableYears;
  }, [selectedCurrencyProfile?.initialDate, selectedYear]);

  const handleRefresh = useCallback(() => {
    if (selectedCurrencyProfile) {
      if (type === TransactionTypeEnum.Income) {
        dispatch(
          fetchIncomesPageAsync({
            currencyProfileId: selectedCurrencyProfile.id,
            month: selectedMonth,
            year: selectedYear,
            search: transactionsPageState.search,
            filters: transactionsPageState.filter,
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
            search: transactionsPageState.search,
            filters: transactionsPageState.filter,
            sort: transactionsPageState.sortValue,
            pageNum: transactionsPageState.page.pageNum,
          })
        );
      }
    }
  }, [
    dispatch,
    selectedCurrencyProfile,
    selectedMonth,
    selectedYear,
    transactionsPageState.filter,
    transactionsPageState.page.pageNum,
    transactionsPageState.search,
    transactionsPageState.sortValue,
    type,
  ]);

  return (
    <div className="transactions-date-section-container">
      <div className="transactions-date-section">
        <MonthPicker month={selectedMonth} onChange={onMonthChange} />
        <YearPicker
          year={selectedYear}
          availableYears={availableYears}
          onChange={onYearChange}
        />
      </div>
      <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
    </div>
  );
};

export default TransactionsDateSection;
