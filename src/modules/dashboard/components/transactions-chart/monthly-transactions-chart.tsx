import "./transactions-chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { AppDispatch, AppState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchDailyTransactionStatisticsAsync,
  fetchMonthlyTransactionStatisticsAsync,
} from "../../states/redux/thunks/transactions-page-thunks";
import { formatCurrency } from "../../../currency-profile/utils";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { YearPicker } from "../year-picker/year-picker";
import { formatMonth, getYearsBetweenDates } from "../../utils";

const MonthlyTransactionsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionStatisticsState = useSelector(
    (state: AppState) => state.transactionStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchMonthlyTransactionStatisticsAsync({
        year: transactionStatisticsState.selectedYear,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onYearChange = (newYear: number) => {
    dispatch(
      fetchMonthlyTransactionStatisticsAsync({
        year: newYear,
      })
    );
    dispatch(
      fetchDailyTransactionStatisticsAsync({
        month: transactionStatisticsState.selectedMonth,
        year: newYear,
      })
    );
  };

  let availableYears: number[] = [transactionStatisticsState.selectedYear];
  if (selectedCurrencyProfile?.createdAt) {
    availableYears = getYearsBetweenDates(
      selectedCurrencyProfile?.createdAt,
      new Date()
    );
  }

  return (
    <div className="transactions-chart">
      <div className="transactions-chart-header">
        <h3 className="transactions-chart-subtitle">
          {t("dashboard.monthlyTransactions")}
        </h3>
        <YearPicker
          year={transactionStatisticsState.selectedYear}
          availableYears={availableYears}
          onChange={onYearChange}
        />
      </div>
      <div className="transactions-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={transactionStatisticsState.monthlyStatistics.points}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(value: number) => formatMonth(value, t)}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                formatCurrency(value, selectedCurrencyProfile!.currency)
              }
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#d61c2a"
              fill="#d61c2a"
              fillOpacity={0.15}
              strokeWidth={2}
              name={t("dashboard.expenses")}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#1da53f"
              fill="#1da53f"
              fillOpacity={0.15}
              strokeWidth={2}
              name={t("dashboard.income")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTransactionsChart;
