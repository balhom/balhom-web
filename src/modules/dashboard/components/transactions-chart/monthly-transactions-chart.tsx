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
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  fetchDailyTransactionStatisticsAsync,
  fetchMonthlyTransactionStatisticsAsync,
} from "../../states/redux/thunks/transaction-statistics-thunks";
import { formatCurrency } from "../../../currency-profile/utils";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { YearPicker } from "../../../../common/components/year-picker/year-picker";
import {
  formatMonth,
  getYearsBetweenDates,
} from "../../../../common/utils/date-utils";
import { dashboardChartTooltip } from "../dashboard-chart-tooltip/dashboard-chart-tooltip";

const MonthlyTransactionsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionStatisticsState = useSelector(
    (state: AppState) => state.transactionStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  const selectedYearRef = useRef(transactionStatisticsState.selectedYear);

  useEffect(() => {
    dispatch(
      fetchMonthlyTransactionStatisticsAsync({
        year: selectedYearRef.current,
      })
    );
  }, [dispatch, selectedYearRef, selectedCurrencyProfile]);

  const onYearChange = useCallback(
    (newYear: number) => {
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
    },
    [dispatch, transactionStatisticsState.selectedMonth]
  );

  const availableYears = useMemo(() => {
    let availableYears: number[] = [transactionStatisticsState.selectedYear];
    if (selectedCurrencyProfile?.initialDate) {
      availableYears = getYearsBetweenDates(
        selectedCurrencyProfile?.initialDate,
        new Date()
      );
    }
    return availableYears;
  }, [
    selectedCurrencyProfile?.initialDate,
    transactionStatisticsState.selectedYear,
  ]);

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
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
            />
            <XAxis
              dataKey="month"
              tickFormatter={(value: number) => formatMonth(value, t)}
              stroke="var(--color-text-secondary)"
            />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip
              content={dashboardChartTooltip({
                formatter: (value: number) =>
                  formatCurrency(value, selectedCurrencyProfile!.currency),
                labelFormatter: (label) => formatMonth(label, t),
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

export default MonthlyTransactionsChart;
