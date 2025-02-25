import "./transaction-category-chart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import { formatCurrency } from "../../../currency-profile/utils";
import { useEffect } from "react";
import { AppDispatch, AppState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { fetchTransactionCategoryStatisticsAsync } from "../../states/redux/thunks/transaction-category-statistics-thunks";
import { formatTransactionCategory } from "../../utils";

interface Props {
  month: number;
  year: number;
  type: TransactionTypeEnum;
}

const TransactionsCategoryChart: React.FC<Props> = ({
  month,
  year,
  type,
}: Props) => {
  const { t } = useTranslation();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const transactionCategoryStatisticsState = useSelector(
    (state: AppState) => state.transactionCategoryStatistics
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchTransactionCategoryStatisticsAsync({
        type: type,
        month: month,
        year: year,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyProfile, type, month, year]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="transactions-category-chart-tooltip">
          <div className="transactions-category-chart-tooltip-header">
            <img
              src={data.category.image}
              alt={formatTransactionCategory(data.category.code, t)}
              className="transactions-category-chart-tooltip-image"
            />
            <span className="transactions-category-chart-tooltip-category">
              {formatTransactionCategory(data.category.code, t)}
            </span>
          </div>
          <div className={`transactions-category-chart-tooltip-amount ${type.toLowerCase()}`}>
            {formatCurrency(data.value, selectedCurrencyProfile!.currency)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="transactions-category-chart">
      <div className="transactions-category-chart-header">
        <h2 className="transactions-category-chart-title">
          {t("transaction.monthlyDistribution")}
        </h2>
      </div>
      <div className="transactions-category-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transactionCategoryStatisticsState.categoryStatistics.points}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 34, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              dataKey="value"
              tickFormatter={(value) =>
                formatCurrency(value, selectedCurrencyProfile!.currency)
              }
            />
            <YAxis
              type="category"
              dataKey="category.code"
              tickLine={false}
              tickMargin={45}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <image
                    x="-40"
                    y="-12"
                    width="24"
                    height="24"
                    xlinkHref={
                      transactionCategoryStatisticsState.categoryStatistics.points.find(
                        (point) => point.category.code == payload.value
                      )?.category.image
                    }
                    style={{ borderRadius: "50%" }}
                  />
                  <text
                    x="-10"
                    y="4"
                    textAnchor="start"
                    fill="var(--color-text-secondary)"
                    className="transactions-category-chart-label"
                  >
                    {formatTransactionCategory(payload.value, t)}
                  </text>
                </g>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill={`var(--color-${type.toLowerCase()})`}
              radius={[0, 4, 4, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsCategoryChart;
