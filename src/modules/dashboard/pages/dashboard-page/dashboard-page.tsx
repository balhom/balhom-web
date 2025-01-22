import "./dashboard-page.css";
import RefreshButton from "../../../../common/components/refresh-button/refresh-button";
import TransactionChartsSection from "../../components/transaction-charts-section/transaction-charts-section";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../store";
import {
  fetchDailyTransactionStatisticsAsync,
  fetchMonthlyTransactionStatisticsAsync,
} from "../../states/redux/thunks/transactions-page-thunks";

const DashboardPage: React.FC = () => {
  const transactionStatisticsState = useSelector(
    (state: AppState) => state.transactionStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  const isLoading: boolean =
    transactionStatisticsState.isDailyStatisticsLoading ||
    transactionStatisticsState.isMonthlyStatisticsLoading;

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <RefreshButton
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
                }
          }
        />
      </div>
      <section className="dashboard-page-section">
        <TransactionChartsSection />
      </section>
      {/*
      <section className="dashboard-page-section">
        <SavingsCharts />
      </section>
      */}
    </div>
  );
};

export default DashboardPage;
