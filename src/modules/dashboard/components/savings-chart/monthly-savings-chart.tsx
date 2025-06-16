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
import { YearPicker } from "../../../../common/components/year-picker/year-picker";
import { fetchMonthlySavingStatisticsAsync } from "../../states/redux/thunks/saving-statistics-thunks";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { AppDispatch, AppState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import {
  formatMonth,
  getYearsBetweenDates,
} from "../../../../common/utils/date-utils";
import { formatAmountAndCurrency } from "../../../currency-profile/utils";
import { dashboardChartTooltip } from "../dashboard-chart-tooltip/dashboard-chart-tooltip";

const MonthlySavingsChart: React.FC = () => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const savingStatisticsState = useSelector(
    (state: AppState) => state.savingStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  const selectedYearRef = useRef(savingStatisticsState.selectedYear);

  useEffect(() => {
    dispatch(
      fetchMonthlySavingStatisticsAsync({
        currencyProfileId: selectedCurrencyProfile!.id,
        year: selectedYearRef.current,
      })
    );
  }, [dispatch, selectedYearRef, selectedCurrencyProfile]);

  const onYearChange = useCallback(
    (newYear: number) => {
      dispatch(
        fetchMonthlySavingStatisticsAsync({
          currencyProfileId: selectedCurrencyProfile!.id,
          year: newYear,
        })
      );
    },
    [dispatch, selectedCurrencyProfile]
  );

  const availableYears = useMemo(() => {
    let availableYears: number[] = [savingStatisticsState.selectedYear];
    if (selectedCurrencyProfile?.initialDate) {
      availableYears = getYearsBetweenDates(
        selectedCurrencyProfile?.initialDate,
        new Date()
      );
    }
    return availableYears;
  }, [
    savingStatisticsState.selectedYear,
    selectedCurrencyProfile?.initialDate,
  ]);

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
                  formatAmountAndCurrency(value, selectedCurrencyProfile!.currency),
                labelFormatter: (label) => formatMonth(label, t),
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

export default MonthlySavingsChart;
