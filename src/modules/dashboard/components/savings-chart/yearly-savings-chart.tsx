import "./savings-chart.css";
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
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { AppDispatch, AppState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchYearlySavingStatisticsAsync } from "../../states/redux/thunks/saving-statistics-thunks";
import { formatCurrency } from "../../../currency-profile/utils";
import { dashboardChartTooltip } from "../dashboard-chart-tooltip/dashboard-chart-tooltip";

const YearlySavingsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const savingStatisticsState = useSelector(
    (state: AppState) => state.savingStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchYearlySavingStatisticsAsync({
        currencyProfileId: selectedCurrencyProfile!.id,
      })
    );
  }, [dispatch, selectedCurrencyProfile]);

  return (
    <div className="savings-chart">
      <div className="savings-chart-header">
        <h3 className="savings-chart-subtitle">
          {t("dashboard.yearlySavings")}
        </h3>
      </div>
      <div className="savings-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={savingStatisticsState.yearlyStatistics.points}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
            />
            <XAxis dataKey="year" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip
              content={dashboardChartTooltip({
                formatter: (value) =>
                  formatCurrency(value, selectedCurrencyProfile!.currency),
                labelFormatter: (label) => label,
              })}
            />
            <Area
              type="monotone"
              dataKey="goal"
              stroke="var(--color-saving-goal)"
              fill="var(--color-saving-goal)"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t("dashboard.expectedSavings")}
            />
            <Area
              type="monotone"
              dataKey="saving"
              stroke="var(--color-saving)"
              fill="var(--color-saving)"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t("dashboard.actualSavings")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlySavingsChart;
