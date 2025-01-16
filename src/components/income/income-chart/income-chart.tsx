import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { INCOME_CATEGORIES } from '../../../types/income';
import type { Income, IncomeCategory } from '../../../types/income';
import { formatCurrency } from '../../../utils/currency';
import './income-chart.css';

interface IncomeChartProps {
  data: Income[];
  currency: string;
}

interface CategoryTotal {
  category: IncomeCategory;
  total: number;
  name: string;
  image: string;
}

const IncomeChart = ({ data, currency }: IncomeChartProps) => {
  const { t } = useTranslation();

  const categoryTotals = data.reduce<CategoryTotal[]>((acc, income) => {
    const existingCategory = acc.find(cat => cat.category === income.category);
    const categoryInfo = INCOME_CATEGORIES[income.category];

    if (existingCategory) {
      existingCategory.total += income.amount;
    } else {
      acc.push({
        category: income.category,
        total: income.amount,
        name: categoryInfo.name,
        image: categoryInfo.image
      });
    }
    return acc;
  }, []);

  // Sort by total amount descending
  const sortedData = categoryTotals.sort((a, b) => b.total - a.total);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <div className="tooltip-header">
            <img src={data.image} alt={data.name} className="tooltip-image" />
            <span className="tooltip-category">{data.name}</span>
          </div>
          <div className="tooltip-amount">
            {formatCurrency(data.total, currency)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="income-chart">
      <div className="income-chart-header">
        <h2 className="income-chart-title">{t('income.monthlyDistribution')}</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis 
              type="number"
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              tickLine={false}
              tickMargin={45}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <image
                    x="-40"
                    y="-12"
                    width="24"
                    height="24"
                    xlinkHref={sortedData.find(d => d.name === payload.value)?.image}
                    style={{ borderRadius: '50%' }}
                  />
                  <text x="-10" y="4" textAnchor="start" fill="#666" className="chart-label">
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="total" 
              fill="#4CAF50"
              radius={[0, 4, 4, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeChart;