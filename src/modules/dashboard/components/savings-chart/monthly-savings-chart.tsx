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
import { YearPicker } from "../year-picker/year-picker";
import { formatMonth, getYearsBetweenDates } from "../../utils";
import { fetchMonthlySavingStatisticsAsync } from "../../states/redux/thunks/saving-statistics-thunks";
import { useEffect } from "react";
import { AppDispatch, AppState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { formatCurrency } from "../../../currency-profile/utils";

const MonthlySavingsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const savingStatisticsState = useSelector(
    (state: AppState) => state.savingStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchMonthlySavingStatisticsAsync({
        year: savingStatisticsState.selectedYear,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyProfile]);

  const onYearChange = (newYear: number) => {
    dispatch(
      fetchMonthlySavingStatisticsAsync({
        year: newYear,
      })
    );
  };

  let availableYears: number[] = [savingStatisticsState.selectedYear];
  if (selectedCurrencyProfile?.createdAt) {
    availableYears = getYearsBetweenDates(
      selectedCurrencyProfile?.createdAt,
      new Date()
    );
  }

  return (
    <div className="savings-chart">
      <div className="savings-chart-header">
        <h3 className="savings-chart-subtitle">
          {t("dashboard.monthlySavings")}
        </h3>
        <YearPicker
          year={savingStatisticsState.selectedYear}
          availableYears={availableYears}
          onChange={onYearChange}
        />
      </div>
      <div className="savings-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={savingStatisticsState.monthlyStatistics.points}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              labelFormatter={(label) => formatMonth(label, t)}
            />
            <Area
              type="monotone"
              dataKey="goal"
              stroke="#FFB74D"
              fill="#FFB74D"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t("dashboard.expectedSavings")}
            />
            <Area
              type="monotone"
              dataKey="saving"
              stroke="#9C27B0"
              fill="#9C27B0"
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

export default MonthlySavingsChart;
