import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { MonthSelect } from './month-select';
import { formatCurrency } from '../../../utils/currency';
import type { DailyTransaction } from '../../../types/transactions';
import './transaction-charts.css';

interface DailyTransactionsChartProps {
  data: DailyTransaction[];
  currency: string;
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const DailyTransactionsChart = ({ 
  data, 
  currency,
  selectedMonth,
  onMonthChange 
}: DailyTransactionsChartProps) => {
  const { t } = useTranslation();

  return (
    <div className="chart">
      <div className="chart-header">
        <h3 className="chart-subtitle">{t('dashboard.dailyTransactions')}</h3>
        <MonthSelect value={selectedMonth} onChange={onMonthChange} />
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tickFormatter={(value) => `${value}`}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
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

export default DailyTransactionsChart;