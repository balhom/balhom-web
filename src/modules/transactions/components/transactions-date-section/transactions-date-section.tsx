import "./transactions-date-section.css";
import { useSelector } from "react-redux";
import RefreshButton from "../../../../common/components/refresh-button/refresh-button";
import { AppState } from "../../../../store";
import { MonthPicker } from "../../../../common/components/month-picker/month-picker";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { getYearsBetweenDates } from "../../../../common/utils/date-utils";
import { YearPicker } from "../../../../common/components/year-picker/year-picker";

interface Props {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onRefresh: () => void;
}

const TransactionsDateSection: React.FC<Props> = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onRefresh,
}: Props) => {
  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionCategoryStatisticsState = useSelector(
    (state: AppState) => state.transactionCategoryStatistics
  );

  const isLoading = transactionCategoryStatisticsState.isStatisticsLoading;

  let availableYears: number[] = [selectedYear];
  if (selectedCurrencyProfile?.initialDate) {
    availableYears = getYearsBetweenDates(
      selectedCurrencyProfile?.initialDate,
      new Date()
    );
  }

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
      <RefreshButton onClick={onRefresh} isLoading={isLoading} />
    </div>
  );
};

export default TransactionsDateSection;
