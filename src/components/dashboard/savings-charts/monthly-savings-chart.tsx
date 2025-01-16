import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { YearSelect } from './year-select';
import { formatCurrency } from '../../../utils/currency';
import type { MonthlySavings } from '../../../types/savings';
import './savings-charts.css';

interface MonthlySavingsChartProps {
  data: MonthlySavings[];
  currency: string;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const MonthlySavingsChart = ({ 
  data, 
  currency,
  selectedYear,
  onYearChange 
}: MonthlySavingsChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="chart">
      <div className="chart-header">
        <h3 className="chart-subtitle">{t('dashboard.monthlySavings')}</h3>
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
              dataKey="expectedSavings"
              stroke="#FFB74D"
              fill="#FFB74D"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t('dashboard.expectedSavings')}
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#9C27B0"
              fill="#9C27B0"
              fillOpacity={0.2}
              strokeWidth={2}
              name={t('dashboard.actualSavings')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySavingsChart;