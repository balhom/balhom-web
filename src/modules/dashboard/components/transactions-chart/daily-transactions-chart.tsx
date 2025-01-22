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
import { fetchDailyTransactionStatisticsAsync } from "../../states/redux/thunks/transactions-page-thunks";
import { MonthPicker } from "../month-picker/month-picker";
import { formatCurrency } from "../../../currency-profile/utils";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";

const DailyTransactionsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionStatisticsState = useSelector(
    (state: AppState) => state.transactionStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchDailyTransactionStatisticsAsync({
        month: transactionStatisticsState.selectedMonth,
        year: transactionStatisticsState.selectedYear,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMonthChange = (newMonth: number) => {
    dispatch(
      fetchDailyTransactionStatisticsAsync({
        month: newMonth,
        year: transactionStatisticsState.selectedYear,
      })
    );
  };

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
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickFormatter={(value) => `${value}`} />
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

export default DailyTransactionsChart;
