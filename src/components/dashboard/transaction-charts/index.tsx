import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrencyProfile } from '../../../hooks/use-currency-profile';
import { useTransactionData } from '../../../hooks/use-transaction-data';
import DailyTransactionsChart from './daily-transactions-chart';
import MonthlyTransactionsChart from './monthly-transactions-chart';
import './transaction-charts.css';

const TransactionCharts = () => {
  const { t } = useTranslation();
  const { profile } = useCurrencyProfile();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { dailyData, monthlyData } = useTransactionData(selectedMonth, selectedYear);

  if (!profile) return null;

  return (
    <div className="transaction-charts-container">
      <h2 className="chart-title">{t('dashboard.transactions')}</h2>
      <div className="charts-grid">
        <div className="transactions-daily-chart">
          <DailyTransactionsChart
            data={dailyData}
            currency={profile.currency}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </div>
        <div className="transactions-monthly-chart">
          <MonthlyTransactionsChart
            data={monthlyData}
            currency={profile.currency}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionCharts;