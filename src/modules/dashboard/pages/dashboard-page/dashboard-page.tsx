import "./dashboard-page.css";
import RefreshButton from "../../../../common/components/refresh-button/refresh-button";
import TransactionChartsSection from "../../components/transaction-charts-section/transaction-charts-section";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../store";
import {
  fetchDailyTransactionStatisticsAsync,
  fetchMonthlyTransactionStatisticsAsync,
} from "../../states/redux/thunks/transaction-statistics-thunks";
import {
  fetchMonthlySavingStatisticsAsync,
  fetchYearlySavingStatisticsAsync,
} from "../../states/redux/thunks/saving-statistics-thunks";
import SavingsChartsSection from "../../components/savings-charts-section/savings-charts-section";

const DashboardPage: React.FC = () => {
  const transactionStatisticsState = useSelector(
    (state: AppState) => state.transactionStatistics
  );
  const savingStatisticsState = useSelector(
    (state: AppState) => state.savingStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  const isLoading: boolean =
    transactionStatisticsState.isDailyStatisticsLoading ||
    transactionStatisticsState.isMonthlyStatisticsLoading ||
    savingStatisticsState.isMonthlyStatisticsLoading ||
    savingStatisticsState.isYearlyStatisticsLoading;

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <RefreshButton
          isLoading={isLoading}
          onClick={
            isLoading
              ? undefined
              : () => {
                  dispatch(
                    fetchDailyTransactionStatisticsAsync({
                      month: transactionStatisticsState.selectedMonth,
                      year: transactionStatisticsState.selectedYear,
                    })
                  );
                  dispatch(
                    fetchMonthlyTransactionStatisticsAsync({
                      year: transactionStatisticsState.selectedYear,
                    })
                  );
                  dispatch(
                    fetchMonthlySavingStatisticsAsync({
                      year: savingStatisticsState.selectedYear,
                    })
                  );
                  dispatch(fetchYearlySavingStatisticsAsync());
                }
          }
        />
      </div>
      <section className="dashboard-page-section">
        <TransactionChartsSection />
      </section>
      <section className="dashboard-page-section">
        <SavingsChartsSection />
      </section>
    </div>
  );
};

export default DashboardPage;
