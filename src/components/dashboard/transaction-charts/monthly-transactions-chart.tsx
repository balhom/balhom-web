import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { YearSelect } from './year-select';
import { formatCurrency } from '../../../utils/currency';
import type { MonthlyTransaction } from '../../../types/transactions';
import './transaction-charts.css';

interface MonthlyTransactionsChartProps {
  data: MonthlyTransaction[];
  currency: string;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const MonthlyTransactionsChart = ({ 
  data, 
  currency,
  selectedYear,
  onYearChange 
}: MonthlyTransactionsChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="chart">
      <div className="chart-header">
        <h3 className="chart-subtitle">{t('dashboard.monthlyTransactions')}</h3>
        <YearSelect value={selectedYear} onChange={onYearChange} />
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => t(`months.${value.toLowerCase()}`)}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
              labelFormatter={(label) => t(`months.${label.toLowerCase()}`)}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#1da53f"
              fill="#1da53f"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t('dashboard.income')}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#d61c2a"
              fill="#d61c2a"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t('dashboard.expenses')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTransactionsChart;