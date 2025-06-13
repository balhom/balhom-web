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
import { useCallback, useEffect, useRef } from "react";
import { fetchDailyTransactionStatisticsAsync } from "../../states/redux/thunks/transaction-statistics-thunks";
import { MonthPicker } from "../../../../common/components/month-picker/month-picker";
import { formatCurrency } from "../../../currency-profile/utils";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { dashboardChartTooltip } from "../dashboard-chart-tooltip/dashboard-chart-tooltip";

const DailyTransactionsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionStatisticsState = useSelector(
    (state: AppState) => state.transactionStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  const selectedMonthRef = useRef(transactionStatisticsState.selectedMonth);
  const selectedYearRef = useRef(transactionStatisticsState.selectedYear);

  useEffect(() => {
    dispatch(
      fetchDailyTransactionStatisticsAsync({
        currencyProfileId: selectedCurrencyProfile!.id,
        month: selectedMonthRef.current,
        year: selectedYearRef.current,
      })
    );
  }, [dispatch, selectedMonthRef, selectedYearRef, selectedCurrencyProfile]);

  const onMonthChange = useCallback(
    (newMonth: number) => {
      dispatch(
        fetchDailyTransactionStatisticsAsync({
          currencyProfileId: selectedCurrencyProfile!.id,
          month: newMonth,
          year: transactionStatisticsState.selectedYear,
        })
      );
    },
    [dispatch, selectedCurrencyProfile, transactionStatisticsState.selectedYear]
  );

  return (
    <div className="transactions-chart">
      <div className="transactions-chart-header">
        <h3 className="transactions-chart-subtitle">
          {t("dashboard.dailyTransactions")}
        </h3>
        <MonthPicker
          month={transactionStatisticsState.selectedMonth}
          onChange={onMonthChange}
        />
      </div>
      <div className="transactions-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={transactionStatisticsState.dailyStatistics.points}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
            />
            <XAxis
              dataKey="day"
              tickFormatter={(value) => `${value}`}
              stroke="var(--color-text-secondary)"
            />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip
              content={dashboardChartTooltip({
                formatter: (value: number) =>
                  formatCurrency(value, selectedCurrencyProfile!.currency),
                labelFormatter: (label) => label,
              })}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="var(--color-expense)"
              fill="var(--color-expense)"
              fillOpacity={0.15}
              strokeWidth={2}
              name={t("dashboard.expenses")}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              fill="var(--color-income)"
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

export default DailyTransactionsChart;
