import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../utils/currency';
import type { YearlySavings } from '../../../types/savings';
import './savings-charts.css';

interface YearlySavingsChartProps {
  data: YearlySavings[];
  currency: string;
}

const YearlySavingsChart = ({ 
  data, 
  currency
}: YearlySavingsChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="chart">
      <div className="chart-header">
        <h3 className="chart-subtitle">{t('dashboard.yearlySavings')}</h3>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
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

export default YearlySavingsChart;